import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {

  static get cpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let soma;
      let resto;
      let i;
      soma = 0;
      const controlValue = control.value.replaceAll(/\.|-|\//g,'');

      if (controlValue == "00000000000") return {cpf:true};

      for (i=1; i<=9; i++) soma = soma + parseInt(controlValue.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(controlValue.substring(9, 10)) ) return {cpf:true};

        soma = 0;
        for (i = 1; i <= 10; i++) soma = soma + parseInt(controlValue.substring(i-1, i)) * (12 - i);
          resto = (soma * 10) % 11;

        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(controlValue.substring(10, 11) ) ) return {cpf:true};

        return null;
    }
  }

}
