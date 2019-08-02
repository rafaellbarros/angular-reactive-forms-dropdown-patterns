import { AlterarNomeBlocInterface } from '../alterar-nome-bloc.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Solicitacao, AlterarNome } from 'src/app/components/models';
import { OnInit } from '@angular/core';


export class AlterarNomeBlocImpl implements AlterarNomeBlocInterface, OnInit {

  private _alterarNomeForm: FormGroup;

  constructor(private _dados: Solicitacao, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initAlterarNomeForm();
  }

  public getAlterarNomeForm(): FormGroup {
    return this._alterarNomeForm;
  }

  private initAlterarNomeForm(): void {
    const dados: AlterarNome = this.recuperarDadoAlterarNome();
    this._alterarNomeForm = this._fb.group({
      nome: [dados.nome]
    });
  }

  private recuperarDadoAlterarNome(): AlterarNome {
    const alterarNome: AlterarNome = {
      nome: ''
    };

    if (this._dados.dados.alterarNome === undefined || this._dados.dados.alterarNome.nome === null) {
      return alterarNome as AlterarNome;
    } else if (this._dados.dados.opcao.id === 1) {
      return this._dados.dados.alterarNome;
    }
  }

}
