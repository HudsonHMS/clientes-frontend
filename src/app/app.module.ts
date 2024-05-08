import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './templates/template/template.component';
import { HttpClientModule } from '@angular/common/http';
import { CpfPipe } from './shared/pipes/cpf.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TemplateComponent,
    CpfPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
