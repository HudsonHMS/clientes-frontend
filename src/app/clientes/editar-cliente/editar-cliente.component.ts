import { Cliente } from './../../model/cliente';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { teste } from 'src/app/model/teste';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit, teste {

  constructor( private clienteService: ClientesService, private location: Location, private router: Router ) {
  }
  id?: number | undefined;
  dialogService?: DialogService | undefined;
  type?: any;
  style?: { [klass: string]: any; } | undefined;

  setDialogData(id: number, dialogService: DialogService, type?: any, style?: {[klass: string]: any;}): void {
    this.id = id;
    this.dialogService = dialogService
    this.type = type;
    this.style = style!;
  }



  public opennerDetectorChange!: ChangeDetectorRef;
  public cliente!: Cliente;

  private fb = new FormBuilder();

  public form: FormGroup = this.fb.group({
    id: [null],
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    cpf: ['', [Validators.maxLength(11), Validators.minLength(11), Validators.required]],
    status_id: [1]
});

  ngOnInit(): void {
    if( this.id ) {
      this.clienteService.getClientPorId(this.id).subscribe({
        next: cli => {
          this.cliente = cli.responseData!;
          this.form.get('id')?.setValue(cli.responseData?.id);
          this.form.get('nome')?.setValue(cli.responseData?.nome);
          this.form.get('cpf')?.setValue(cli.responseData?.cpf);
        }
      });
    }
  }

  public get getCliente() : Cliente | undefined {
    return this.cliente;
  }

  public set setClienteNome ( nome:string ) {
    this.cliente.nome = nome;
  }

  public set setClienteCpf ( cpf:string ) {
    this.cliente.cpf = cpf;
  }

  cancelar() {
    console.log( 'Cancelar' );
    this.dialogService?.close();
  }

  salvar() {
    if( this.form.valid ) {
      if( !!this.form.get('id')?.value ) {
        this.clienteService.editarCliente( this.form.value ).subscribe();
      } else {
        this.clienteService.cadastrarCliente( this.form.value ).subscribe();
      }
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true, replaceUrl: true })
                   .then(() => { this.router.navigate([this.location.path()], {skipLocationChange: true})});
      }, 1000);
      this.dialogService?.close();
    }
    this.dialogService?.close();
  }

}
