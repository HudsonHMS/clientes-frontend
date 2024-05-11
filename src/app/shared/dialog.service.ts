import { ComponentRef, Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type, EventEmitter } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogComponentRef!: ComponentRef<DialogComponent>
  private openInstance!: DialogService;

  private serviceEmitter: EventEmitter<DialogService> = new EventEmitter();

  constructor(  private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector ) {
  }

  public  emitEvent() {
    this.serviceEmitter.emit(this.openInstance);
  }

  public get getEventEmitter() {
    return this.serviceEmitter;
  }

  private appendDialogComponentToBody() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    this.dialogComponentRef = componentRef;
  }

  private detachDialogComponentToBody() {
    this.appRef.detachView( this.dialogComponentRef.hostView );
    this.dialogComponentRef.destroy();
  }

  public open( component: Type<any>, data: {id?:number, dialogService?:DialogService, type?: any, style?:{[klass:string]:any}} = {} ) {
    this.appendDialogComponentToBody();
    this.dialogComponentRef.instance.setData = data;
    this.dialogComponentRef.instance.childType = component;
    this.emitEvent();
  }

  public close() {
    this.detachDialogComponentToBody();
  }

   set setInstanceRefofService ( service: DialogService ) {
    this.dialogComponentRef.instance.setService = service ;
  }

}
