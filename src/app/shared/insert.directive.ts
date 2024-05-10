import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsert]',
  standalone:true,
})
export class InsertDirective {

  constructor( public viewContainerRef: ViewContainerRef ) {
  }


}
