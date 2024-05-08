import { ClientesService } from './../../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/model/cliente';
import { Router, RouterModule } from '@angular/router';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';

declare var $:any;

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, CpfPipe],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  private clientes!: Cliente[];
  loader: HTMLDivElement | null = document.querySelector('.loader');

  constructor(private clientesService: ClientesService, private router: Router) {}


  ngOnInit(): void {

    if( this.loader ) {
      this.loader.style.display = 'flex';
    }
    this.clientesService.listarClientesAtivos().subscribe({
        next: ( resp ) => {
          if( resp.responseData ) {
            this.clientes = resp.responseData
          }else {
            this.clientes = [];
          }
        },
        error: ( err ) => {
          if( this.loader ) {
            this.loader.style.display = 'none';
          }
        },
        complete: () => {
          if( this.loader ) {
            this.loader.style.display = 'none'
          }
        }

      })

  }

  public get getClientes (): Cliente[] {
    if( this.clientes?.length > 0 ) {
      return this.clientes;
    }
    return [];
  }

  public deletarCliente(event: MouseEvent): void {
     event.preventDefault();
     const id : number =  parseInt( ( (<HTMLLinkElement>event?.currentTarget).getAttribute("client-id") ?? "0" ) );
     if( this.loader ) {
       this.loader.style.display = 'flex';
     }
     this.clientesService.deletarCliente(id).subscribe({
        next: (res) => {
          this.clientes = this.clientes.filter( (el) => el.id != id )
        },
        error: (err) => {
          if( this.loader ) {
            this.loader.style.display = 'none';
          }
        },

        complete: () => {
          if( this.loader ) {
            this.loader.style.display = 'none';
          }
        }
     });
  }

  cadastrarCliente(): void {
    this.router.navigate(["clientes/visualizar/2"]);
  }


}
