import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizar-cliente.component.html',
  styleUrls: ['./visualizar-cliente.component.scss']
})
export class VisualizarClienteComponent implements OnInit {

  constructor( private route: ActivatedRoute ){}


  ngOnInit(): void {
    this.route.data.subscribe( {
      next: ( cliente ) => console.log( "Cliente: ", cliente )
    } );
  }



}
