import { ResponseObject } from './../../model/response-object';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {


  constructor( private route: ActivatedRoute ) {}

  private cliente!: Cliente;

  ngOnInit(): void {
    this.route.data.subscribe({
      next: cli => this.cliente = cli['cliente'].responseData

    });
  }


  public get getCliente() : Cliente | undefined {
    return this.cliente;
  }

}
