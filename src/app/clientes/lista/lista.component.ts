import { ClientesService } from './../../services/clientes.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/model/cliente';
import { Router, RouterModule } from '@angular/router';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import { DialogService } from 'src/app/shared/dialog.service';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';
import { ComumService } from 'src/app/services/comum.service';
import Swal from 'sweetalert2';
import { Alertas } from 'src/app/shared/utils/Alertas';

declare var $: any;

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, CpfPipe],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  private clientes!: Cliente[];
  loader: HTMLDivElement | null = document.querySelector('.loader');

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private dialog: DialogService,
    public detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.loader) {
      this.loader.style.display = 'flex';
    }
    this.clientesService.listarClientesAtivos().subscribe({
      next: (resp) => {
        if (resp.responseData) {
          ComumService.tipo = resp.responseData;
          this.clientes = ComumService.tipo;
        } else {
          this.clientes = [];
        }
      },
      error: (err) => {
        if (this.loader) {
          this.loader.style.display = 'none';
        }
      },
      complete: () => {
        if (this.loader) {
          this.loader.style.display = 'none';
        }
      },
    });
  }

  public get getClientes(): Cliente[] {
    if (this.clientes?.length > 0) {
      return this.clientes;
    }
    return [];
  }

  public deletarCliente(event: MouseEvent): void {
    event.preventDefault();
    const id: number = parseInt((<HTMLLinkElement>event?.currentTarget).getAttribute('client-id') ?? '0');
    Alertas.question({
      title: 'Deletar cliente',
      html: 'Deseja mesmo deletar este cliente?',
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
    }).then((val) => {
      if (val) {
        if (this.loader) {
          this.loader.style.display = 'flex';
        }
        this.clientesService.deletarCliente(id).subscribe({
          next: (res) => {
            this.clientes = this.clientes.filter((el) => el.id != id);
          },
          error: (err) => {
            if (this.loader) {
              this.loader.style.display = 'none';
            }
          },

          complete: () => {
            if (this.loader) {
              this.loader.style.display = 'none';
            }
          },
        });
      }
    });
  }

  cadastrarCliente(): void {
    this.dialog.open(EditarClienteComponent, {
      dialogService: this.dialog,
      type: this.clientes,
      style: { width: '50%', height: '40%' },
    });
    this.dialog.setInstanceRefofService = this.dialog;
    this.setComumService();
  }

  editarCliente(clienteId: number) {
    this.dialog.open(EditarClienteComponent, {
      id: clienteId,
      dialogService: this.dialog,
      type: this.clientes,
      style: { width: '50%', height: '40%' },
    });
    this.dialog.setInstanceRefofService = this.dialog;
    this.setComumService();
  }

  private setComumService(): void {
    ComumService.detector = this.detector;
    ComumService.tipo = this.clientes;
  }
}
