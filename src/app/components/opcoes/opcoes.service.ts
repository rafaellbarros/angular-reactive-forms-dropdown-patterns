import { Injectable } from '@angular/core';
import { Opcao } from '../models/opcoes.model';

@Injectable({
  providedIn: 'root'
})
export class OpcoesService {

  opcoes: Opcao[];

  constructor() {
    this.opcoes = this.getOpcoes();
  }

  private getOpcoes() {
    return [
      { label: 'Selecione uma opção', value: null},
      { label: 'Alterar Nome', value: { id: 1, descricao: 'Alterar Nome' }},
      { label: 'Alterar Contato', value: { id: 2, name: 'Alterar Contato' }},
    ];
  }
}
