import { ClientesService } from './../../services/clientes.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/model/cliente';
import { RouterModule } from '@angular/router';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';

declare var $:any;

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, CpfPipe],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, AfterContentChecked {

  private clientes!: Cliente[];

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {

    this.clientesService.listarClientesAtivos().subscribe({
        next: ( resp ) => {
          if( resp.responseData ) {
            this.clientes = resp.responseData
          }else {
            this.clientes = [];
          }
        },
        error: ( err ) => console.log(err)

      })

  }

  public get getClientes (): Cliente[] {
    if( this.clientes?.length > 0 ) {
      return this.clientes;
    }
    return [];
  }


  ngAfterContentChecked(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

}
