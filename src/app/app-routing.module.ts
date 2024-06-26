import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './clientes/lista/lista.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { post } from 'jquery';
import { ClienteResolver } from './clientes/cliente.resolver';
import { ServicosRoutingModule } from './servicos/servicos/servicos-routing.module';
import { CustomReuseStrategy } from './templates/router-stratege';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },

  {
    path: "clientes",
    title: "Lista de clientes",
    component: ListaComponent,
    data: {
      reuseComponent: true
    }
  },

  {
    path: "clientes/editar/:id",
    title: "Editar cliente",
    component: EditarClienteComponent,
    resolve: { cliente: ClienteResolver }
  },

  {
    path: "clientes/visualizar/:id",
    title: "Visualizar cliente",
    component: EditarClienteComponent,
    resolve: { cliente: ClienteResolver }
  },

  {
    path: "servicos",
    title: "Lista de serviços",
    loadChildren: () => import('./servicos/servicos/servicos-routing.module').then( m => m.ServicosRoutingModule )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'}), ServicosRoutingModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
