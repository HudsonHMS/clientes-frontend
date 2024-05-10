import { ServicoFormComponent } from './../servico-form/servico-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicosComponent } from './servicos.component';

const routes: Routes = [
  {
    path: "servicos",
    pathMatch: "full",
    component: ServicosComponent
  },
  {
    path: "cadastrar",
    title: "Cadastrar serviço",
    component: ServicoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
