import { AlterarNomeBlocImpl } from './bloc/impl/alterar-nome-bloc-impl.class';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators, FormControl } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao, AlterarContato, Solicitacao, OpcaoDto } from '../models/opcoes.model';
import { Constants } from 'src/app/shared/constants';
import { ActivatedRoute } from '@angular/router';
import { AlterarNomeBlocInterface } from './bloc/alterar-nome-bloc.interface';


@Component({
  selector: 'opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css']
})
export class OpcoesComponent implements OnInit, AlterarNomeBlocInterface {

  public readonly ID_ALTERAR_NOME = Constants.ID_ALTERAR_NOME;
  public readonly ID_ALTERAR_CONTATO = Constants.ID_ALTERAR_CONTATO;

  opcoesForm: FormGroup;
  formInitialize = false;
  opcoes: Opcao[];
  solicitacao: any;
  private dados: Solicitacao;

  // ALTERAR NOME
  private _alterarNomeBloc: AlterarNomeBlocInterface;

  // alterarNome: AlterarNome;

  // ALTERAR TELEFONE
  alterarContatoForm: FormGroup;
  alterarContato: AlterarContato;

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
      this._alterarNomeBloc.ngOnInit();
      this.initAlterarContatoForm();
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
  * FIM OPCOES
  */

  /**
  * ALTERAR NOME
  */
   getAlterarNomeForm(): FormGroup {
    return this._alterarNomeBloc.getAlterarNomeForm();
  }
  /**
  * FIM ALTERAR NOME
  */

  // ALTERAR CONTATO

  /**
  * ALTERAR CONTATO
  */
  private initAlterarContatoForm(): void {
    const dados: AlterarContato = this.recuperarDadoAlterarContato();
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this.alterarContatoForm = this.fb.group({
      telefone: [dados.telefone],
      email: [dados.email, [ Validators.required, Validators.pattern(emailPattern),  this.emailDomainValidator]]
    });
  }

  private emailDomainValidator(control: FormControl) {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (domain === 'gmail.com') {
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null;
  }


  private recuperarDadoAlterarContato(): AlterarContato {
    const alterarContato: AlterarContato = {
      telefone: '',
      email: '',
    };

    if (this.dados.dados.alterarContato === undefined || this.dados.dados.alterarContato.telefone === null) {
      return alterarContato as AlterarContato;
    } else if (this.dados.dados.opcao.id === 2) {
      return this.dados.dados.alterarContato;
    }
  }
  /**
  * FIM ALTERAR CONTATO
  */



}
