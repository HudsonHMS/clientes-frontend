import { DialogService } from 'src/app/shared/dialog.service';

export interface teste {
  id?:number;
  dialogService?: DialogService;
  type?: any
  style?: {[klass:string]:any},

  setDialogData ( id: number, dialogService:DialogService, type?: any, style?:{[klass:string]:any} ) : void

}
