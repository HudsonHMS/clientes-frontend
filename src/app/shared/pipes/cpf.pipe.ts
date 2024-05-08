import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true,
})
export class CpfPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return this.setMask(value);
  }

  private setMask(cpf: string){

    let num = cpf.replace(/[^\d]/g, ''); //remove todos os caracteres não numéricos
    let len = num.length; //guarda o número de digitos até o momento

    if(len <= 6){
      cpf = num.replace(/(\d{3})(\d{1,3})/g, '$1.$2');
    }else if(len <= 9){
      cpf = num.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3');
    }else{
      cpf = num.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, "$1.$2.$3-$4");
    }
    return cpf;
  }

}
