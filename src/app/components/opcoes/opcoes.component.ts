import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Form, Validators, FormControl } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao, AlterarNome, AlterarContato, Solicitacao, OpcaoDto } from '../models/opcoes.model';
import { Constants } from 'src/app/shared/constants';
import { AfterViewInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css']
})
export class OpcoesComponent implements OnInit, AfterViewInit {

  public readonly ID_ALTERAR_NOME = Constants.ID_ALTERAR_NOME;
  public readonly ID_ALTERAR_CONTATO = Constants.ID_ALTERAR_CONTATO;

  opcoesForm: FormGroup;
  formInitialize = false;
  opcoes: Opcao[];
  solicitacao: any;
  dados: Solicitacao;

  // ALTERAR NOME
  alterarNomeForm: FormGroup;
  // alterarNome: AlterarNome;

  // ALTERAR TELEFONE
  alterarContatoForm: FormGroup;
  alterarContato: AlterarContato;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private opcoesService: OpcoesService,
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.opcoes = this.opcoesService.opcoes;
    const id = this.route.snapshot.params['id'];
    this.solicitacao = this.opcoesService.getSolicitacaoById(id);

    if (this.solicitacao.length > 0) {
      this.dados = JSON.parse(JSON.stringify(this.solicitacao[0]));
    } else {
      this.dados = this.getDadosVazio();
    }

    this.initForm();
    this.initAlterarNomeForm();
    this.initAlterarContatoForm();
  }

  ngAfterViewInit(): void {

    const html = this.el.nativeElement as HTMLElement;
    const cards = html.getElementsByClassName('card');
    const cardAlterarNome = cards.item(0);
    const cardAlterarContato = cards.item(1);

    this.hiddenElement(cardAlterarNome);
    this.hiddenElement(cardAlterarContato);

    this.getOpcoesForm().get('opcao').valueChanges.subscribe(data => {
      if (data !== null) {
        if (data.id === this.ID_ALTERAR_NOME) {
          this.showElement(cardAlterarNome);
          this.hiddenElement(cardAlterarContato);
        } else if (data.id === this.ID_ALTERAR_CONTATO) {
          this.showElement(cardAlterarContato);
          this.hiddenElement(cardAlterarNome);
        } else {
          this.hiddenElement(cardAlterarNome);
          this.hiddenElement(cardAlterarContato);
        }
      } else {
        this.hiddenElement(cardAlterarNome);
        this.hiddenElement(cardAlterarContato);
      }
    });
  }

  private hiddenElement(element: Element): void {
    this.renderer.setStyle(element, 'display', 'none');
  }

  private showElement(element: Element): void {
    this.renderer.setStyle(element, 'display', 'block');
  }

  private initForm(): void {
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

  // ALTERAR NOME

  private initAlterarNomeForm(): void {
    const dados: AlterarNome = this.recuperarDadoAlterarNome();
    this.alterarNomeForm = this.fb.group({
      nome: [dados.nome]
    });
  }

  private recuperarDadoAlterarNome(): AlterarNome {
    const alterarNome: AlterarNome = {
      nome: ''
    };

    if (this.dados.dados.alterarNome === undefined || this.dados.dados.alterarNome.nome === null) {
      return alterarNome as AlterarNome;
    } else if (this.dados.dados.opcao.id === 1) {
      return this.dados.dados.alterarNome;
    }
  }

  // FIM ALTERAR NOME

  // ALTERAR CONTATO
  public addAlterarContatoForm(): FormGroup {
    this.addFormControl('alterarContato', this.alterarContatoForm);
    return this.alterarContatoForm;
  }

  private initAlterarContatoForm(): void {
    const dados: AlterarContato = this.recuperarDadoAlterarContato();
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this.alterarContatoForm = this.fb.group({
      telefone: [dados.telefone],
      email: [dados.email, [ Validators.required, Validators.pattern(emailPattern),  this.emailDomainValidator]]
    });
  }

   emailDomainValidator(control: FormControl) {
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

    console.log(this.dados.dados)

    if (this.dados.dados.alterarContato === undefined || this.dados.dados.alterarContato.telefone === null) {
      return alterarContato as AlterarContato;
    } else if (this.dados.dados.opcao.id === 2) {
      return this.dados.dados.alterarContato;
    }
  }

  // FIM ALTERAR CONTATO

}
