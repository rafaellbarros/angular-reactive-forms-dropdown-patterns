import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OpcoesComponent } from './components/opcoes/opcoes.component';


const routes: Routes = [
  { path: '', component: OpcoesComponent },
  { path: 'opcao/:id', component: OpcoesComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
