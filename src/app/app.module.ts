import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { AppComponent } from './app.component';

import { AlterarNomeComponent } from './components/opcoes/alterar-nome';
import { AlterarContatoComponent } from './components/opcoes/alterar-contato';
import { AppRoutingModule } from './app-routing.module';
import { OpcoesComponent } from './components/opcoes/opcoes.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    OpcoesComponent,
    AlterarNomeComponent,
    AlterarContatoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxMaskModule.forRoot(options),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
