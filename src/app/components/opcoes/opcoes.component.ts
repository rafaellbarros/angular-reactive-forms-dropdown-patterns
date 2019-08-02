import { OpcoesBlocImpl } from './bloc/impl/opcoes-bloc-impl.class';
import { AlterarContatoBlocImpl } from './bloc/impl/alterar-contato-bloc-impl.class';
import { AlterarNomeBlocImpl } from './bloc/impl/alterar-nome-bloc-impl.class';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao, Solicitacao } from '../models/opcoes.model';
import { Constants } from 'src/app/shared/constants';
import { ActivatedRoute } from '@angular/router';
import { AlterarNomeBlocInterface } from './bloc/alterar-nome-bloc.interface';
import { AlterarContatoBlocInterface } from './bloc/alterar-contato-bloc.interface';
import { OpcoesBlocInterface } from './bloc/opcoes-bloc.interface';

@Component({
  selector: 'opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css']
})
export class OpcoesComponent implements OnInit, OpcoesBlocInterface, AlterarNomeBlocInterface, AlterarContatoBlocInterface {

  public readonly ID_ALTERAR_NOME = Constants.ID_ALTERAR_NOME;
  public readonly ID_ALTERAR_CONTATO = Constants.ID_ALTERAR_CONTATO;

  private _opcoesBloc: OpcoesBlocImpl;
  private _alterarNomeBloc: AlterarNomeBlocImpl;
  private _alterarContatoBloc: AlterarContatoBlocImpl;

  constructor(private route: ActivatedRoute, private opcoesService: OpcoesService, private fb: FormBuilder) { }

  ngOnInit() {
    this._opcoesBloc = new OpcoesBlocImpl(this.route, this.opcoesService, this.fb);
    this._opcoesBloc.ngOnInit();

    this._alterarNomeBloc = new AlterarNomeBlocImpl(this.getDados(), this.fb);
    this._alterarNomeBloc.ngOnInit();

    this._alterarContatoBloc = new AlterarContatoBlocImpl(this.getDados(), this.fb);
    this._alterarContatoBloc.ngOnInit();
  }

  /**
  * OPCOES
  */
  public getOpcoes(): Opcao[] {
    return this._opcoesBloc.getOpcoes();
  }

  public getOpcaoSelecionada(): number {
    return this._opcoesBloc.getOpcaoSelecionada();
  }

  public getDados(): Solicitacao {
   return this._opcoesBloc.getDados();
  }

  public getOpcoesForm(): FormGroup {
    return this._opcoesBloc.getOpcoesForm();
  }

  public getFormInitialize(): boolean {
    return this._opcoesBloc.getFormInitialize();
  }

  public addFormControl(nome: string, formGroup: FormGroup): void {
     return this._opcoesBloc.addFormControl(nome, formGroup);
  }

  /**
  * ALTERAR NOME
  */
  public getAlterarNomeForm(): FormGroup {
    return this._alterarNomeBloc.getAlterarNomeForm();
  }

  /**
  * ALTERAR CONTATO
  */
  public getAlterarContatoForm(): FormGroup {
    return this._alterarContatoBloc.getAlterarContatoForm();
  }
}
