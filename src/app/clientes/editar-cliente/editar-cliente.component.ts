import { Cliente } from './../../model/cliente';
import { Component, ComponentRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { teste } from 'src/app/model/teste';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit, teste {

  constructor( private clienteService: ClientesService) {
  }

  id?: number | undefined;
  dialogService?: DialogService | undefined;
  type?: any;

  setDialogData(id: number, dialogService: DialogService, type: any): void {
    this.id = id;
    this.dialogService = dialogService
    this.type = type;
  }

  public cliente!: Cliente;

  private fb = new FormBuilder();

  public form: FormGroup = this.fb.group({
    id: [this.getCliente?.id ?? null],
    nome: [this.getCliente?.nome ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    cpf: [this.getCliente?.cpf ?? '', [Validators.maxLength(11), Validators.minLength(11), Validators.required]]
});

  ngOnInit(): void {
    this.clienteService.getClientPorId(this.id!).subscribe({
      next: cli => {
        this.cliente = cli.responseData!;
      }
    });
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
    this.dialogService?.close();
  }

  salvar() {
    this.dialogService?.close();
  }

}
