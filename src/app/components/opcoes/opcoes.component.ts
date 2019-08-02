import { AlterarContatoBlocImpl } from './bloc/impl/alterar-contato-bloc-impl.class';
import { AlterarNomeBlocImpl } from './bloc/impl/alterar-nome-bloc-impl.class';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao, Solicitacao, OpcaoDto } from '../models/opcoes.model';
import { Constants } from 'src/app/shared/constants';
import { ActivatedRoute } from '@angular/router';
import { AlterarNomeBlocInterface } from './bloc/alterar-nome-bloc.interface';
import { AlterarContatoBlocInterface } from './bloc/alterar-contato-bloc.interface';


@Component({
  selector: 'opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css']
})
export class OpcoesComponent implements OnInit, AlterarNomeBlocInterface, AlterarContatoBlocInterface {

  public readonly ID_ALTERAR_NOME = Constants.ID_ALTERAR_NOME;
  public readonly ID_ALTERAR_CONTATO = Constants.ID_ALTERAR_CONTATO;

  opcoesForm: FormGroup;
  formInitialize = false;
  opcoes: Opcao[];
  solicitacao: any;
  private dados: Solicitacao;

  // ALTERAR NOME
  private _alterarNomeBloc: AlterarNomeBlocInterface;

  // ALTERAR CONTATO
  private _alterarContatoBloc: AlterarContatoBlocInterface;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private opcoesService: OpcoesService) {

    }

    ngOnInit() {
      this.opcoes = this.opcoesService.opcoes;
      const id = this.route.snapshot.params['id'];
      this.solicitacao = this.opcoesService.getSolicitacaoById(id);

      if (this.solicitacao.length > 0) {
        this.dados = JSON.parse(JSON.stringify(this.solicitacao[0]));
      } else {
        this.dados = this.getDadosVazio();
      }

      this.initOpcoesForm();
      this._alterarNomeBloc = new AlterarNomeBlocImpl(this.dados, this.fb);
      this._alterarContatoBloc = new AlterarContatoBlocImpl(this.dados, this.fb);
      this._alterarNomeBloc.ngOnInit();
      this._alterarContatoBloc.ngOnInit();


  }

  /**
  * OPCOES
  */
  private initOpcoesForm(): void {
    const dados: OpcaoDto = this.recuperarDadosOpcoes();
    this.opcoesForm = this.fb.group({
      opcao: [dados]
    });
    this.formInitialize = true;
    this.opcoesForm.updateValueAndValidity();
  }

  private recuperarDadosOpcoes(): OpcaoDto {
    const opcao: OpcaoDto = {
      id: null,
      descricao: null,
    };

    if (this.solicitacao.length === 0) {
      return opcao as OpcaoDto;
    } else {
      return this.dados.dados.opcao;
    }

  }

  addFormControl(nome: string, formGroup: FormGroup) {
    if (formGroup) {
      this.opcoesForm.addControl(nome, formGroup);
    }
  }

  get opcaoSelecionada() {
    return  this.getOpcoesForm().get('opcao').value != null ? this.getOpcoesForm().get('opcao').value.id : null;
  }

  getOpcoesForm(): FormGroup {
    return this.opcoesForm;
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

  /**
  * ALTERAR NOME
  */
   getAlterarNomeForm(): FormGroup {
    return this._alterarNomeBloc.getAlterarNomeForm();
  }

  /**
  * ALTERAR CONTATO
  */
  getAlterarContatoForm(): FormGroup {
    return this._alterarContatoBloc.getAlterarContatoForm();
  }

}
