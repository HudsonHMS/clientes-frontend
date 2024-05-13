import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export class Alertas {
  static question( options: SweetAlertOptions ): Promise<SweetAlertResult<any>> {
    return Swal.fire( options );
  }
}
