import { OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { OpcaoDto, Solicitacao, Opcao } from 'src/app/components/models';
import { OpcoesBlocInterface } from '../opcoes-bloc.interface';

import { ActivatedRoute } from '@angular/router';
import { OpcoesService } from '../../opcoes.service';

export class OpcoesBlocImpl implements OpcoesBlocInterface, OnInit {

  private _opcoes: Opcao[];
  private _dados: Solicitacao;
  private _opcoesForm: FormGroup;
  private _formInitialize = false;
  private _solicitacao: any;

  constructor(private _route: ActivatedRoute, private _opcoesService: OpcoesService, private _fb: FormBuilder) { }

  public ngOnInit(): void {
    this._opcoes = this._opcoesService.opcoes;
    const id = this._route.snapshot.params['id'];
    this._solicitacao = this._opcoesService.getSolicitacaoById(id);

    if (this._solicitacao.length > 0) {
      this._dados = JSON.parse(JSON.stringify(this._solicitacao[0]));
    } else {
      this._dados = this.getDadosVazio();
    }
    this.initOpcoesForm();
  }

  public getOpcoes(): Opcao[] {
   return this._opcoes;
  }

  public getDados(): Solicitacao {
   return this._dados;
  }

  public getOpcoesForm(): FormGroup {
    return this._opcoesForm;
  }

   public getFormInitialize(): boolean {
    return this._formInitialize;
  }

  public getOpcaoSelecionada(): number {
    return  this._opcoesForm.get('opcao').value != null ? this._opcoesForm.get('opcao').value.id : null;
  }

  public addFormControl(nome: string, formGroup: FormGroup): void {
    if (formGroup) {
      this._opcoesForm.addControl(nome, formGroup);
    }
  }

  private initOpcoesForm(): void {
    const dados: OpcaoDto = this.recuperarDadosOpcoes();
    this._opcoesForm = this._fb.group({
      opcao: [dados]
    });
    this._formInitialize = true;
    this._opcoesForm.updateValueAndValidity();
  }

  private recuperarDadosOpcoes(): OpcaoDto {
    const opcao: OpcaoDto = {
      id: null,
      descricao: null,
    };

    if (this._solicitacao.length === 0) {
      return opcao as OpcaoDto;
    } else {
      return this._dados.dados.opcao;
    }
  }

  private getDadosVazio() {
    return {
      id: null,
      dados: {
        opcao: {
          id: null,
          descricao: null,
        },
        alterarNome: {
          nome: null
        },
        alterarContato: {
          telefone: null,
          email: null
        }
      }
    };
  }
}
