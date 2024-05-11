import { InsertDirective } from './../insert.directive';
import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, OnDestroy, Type, ViewChild, ViewContainerRef, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, InsertDirective],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnDestroy, AfterViewInit {

  private readonly _onClose = new Subject<any>;
  public componentRef!: ComponentRef<any>;
  public childType!: Type<any>;
  public onClose = this._onClose.asObservable();
  private data!: {id?:number, dialogService?:DialogService, type?: any, style?: {[klass:string]: any}};
  private openService!: DialogService;

  private openStile: { [klass: string]: any; } = { 'width': '50%', 'height': '50%' };

  constructor( private detector: ChangeDetectorRef ){}

  @ViewChild(InsertDirective) insertPoint!: InsertDirective

  ngAfterViewInit(): void {
      this.loadChildComponent( this.childType );
      this.detector.detectChanges();
  }

  ngOnDestroy(): void {
    if( this.componentRef ) {
      this.componentRef.destroy();
    }
  }

  onDialogClicked($event: MouseEvent) {

  }

  onOverlayClicked($event: MouseEvent) {
    $event.stopPropagation()
  }

  private loadChildComponent ( component: Type<any> ): void {
      this.setOpenStile = this.data.style!;
      const viewRef: ViewContainerRef = this.insertPoint.viewContainerRef;
      this.componentRef = viewRef.createComponent(component);
      this.componentRef.instance.setDialogData( this.data.id, this.data.dialogService, this.data.type );
  }

  public set setData( data: {id?:number} ) {
    this.data = data;
  }

  public get getData(): {id?: number} {
    return this.data
  }

  public set setService( service: DialogService ) {
    this.openService = service;
  }

  public set setOpenStile ( style: { [klass: string]: any; } ) {
    this.openStile = style;
  }

  public get getOpenStile ( ) {
    return this.openStile;
  }

}
