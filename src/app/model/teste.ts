import { DialogService } from 'src/app/shared/dialog.service';

export interface teste {
  id?:number;
  dialogService?: DialogService;

  setDialogData ( id: number, dialogService:DialogService, type?: any ) : void

}
