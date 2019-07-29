import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao, AlterarNome, AlterarContato } from '../models/opcoes.model';
import { Constants } from 'src/app/shared/constants';
import { AfterViewInit } from '@angular/core';
import { Renderer2 } from '@angular/core';


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

  // ALTERAR NOME
  alterarNomeForm: FormGroup;
  alterarNome: AlterarNome;

  // ALTERAR TELEFONE
  alterarContatoForm: FormGroup;
  alterarContato: AlterarContato;

  constructor(private fb: FormBuilder, private opcoesService: OpcoesService, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.opcoes = this.opcoesService.opcoes;
    this.initForm();
    this.alterarNome = this.novoAlterarNomeForm();
    this.alterarContato = this.novoAlterarContatoForm();
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
    this.opcoesForm = this.fb.group({
      opcao: ['']
    });
    this.formInitialize = true;
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

  // ALTERAR NOME

  private initAlterarNomeForm(): void {
    this.alterarNomeForm = this.fb.group({
      nome: [this.alterarNome.nome]
    });
  }

  private novoAlterarNomeForm(): AlterarNome {
    return {
      nome: null
    };
  }

  // FIM ALTERAR NOME

  // ALTERAR CONTATO
  public addAlterarContatoForm(): FormGroup {
    this.addFormControl('alterarContato', this.alterarContatoForm);
    return this.alterarContatoForm;
  }

  private initAlterarContatoForm(): void {
    this.alterarContatoForm = this.fb.group({
      telefone: [this.alterarContato.telefone]
    });
  }

  private novoAlterarContatoForm(): AlterarContato {
    return {
      telefone: null
    };
  }

  // FIM ALTERAR CONTATO

}
