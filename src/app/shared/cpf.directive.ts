import { Directive, ElementRef, HostListener } from '@angular/core';
import { mask } from './utils/cpf-mask';

@Directive({
  selector: '[cpf]',
  standalone: true
})
export class CpfDirective {

  constructor( private el: ElementRef ) { }

  private campoCpf: HTMLInputElement = this.el.nativeElement;

  @HostListener('input') formatCpf() {
    this.campoCpf.value = mask( this.campoCpf.value );
  }

}
