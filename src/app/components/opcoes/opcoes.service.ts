import { Injectable } from '@angular/core';
import { Opcao, Solicitacao } from '../models';


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
      { label: 'Alterar Contato', value: { id: 2, descricao: 'Alterar Contato' }},
    ];
  }

  public getSolicitacaoById(id: number) {
    return this.getSolicitacoes().filter(s => {
        return s.id === +id;
    });
  }


  private getSolicitacoes() {
    return [
      {   id: 1,
           dados: {
              opcao: {
                id: 1,
                descricao: 'Alterar Nome'
              },
              alterarNome: {
                nome: 'Rafael Barrros'
              }
        }
      },
      { id: 2, dados: {
          opcao: {
            id: 2,
            descricao: 'Alterar Contato'
          },
          alterarContato: {
            telefone: '91337385',
            email: 'rafaelbarros.df@gmail.com'
          }
        }
      }
    ];
  }
}
