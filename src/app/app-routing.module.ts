import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './clientes/lista/lista.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';

const routes: Routes = [
  {
    path: "clientes",
    component: ListaComponent
  },
  {
    path: "clientes/editar/:id",
    title: "Editar cliente",
    component: EditarClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
