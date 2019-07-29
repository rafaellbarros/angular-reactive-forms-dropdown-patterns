import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao } from '../models/opcoes.model';
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

  constructor(private fb: FormBuilder, private opcoesService: OpcoesService, private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.initForm();
    this.opcoes = this.opcoesService.opcoes;
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


  // TODO: Implemntar formulários no opcao e depois criar classes de implementação
  private initForm(): void {
    this.opcoesForm = this.fb.group({
      opcao: ['']
    });
    this.formInitialize = true;
  }

  onChangeOpcoes(event) {
  // TODO: Implementar cabeçahos de acordo com opção selecionada
    const value = event.value;
    if (value !== null) {
      if (value.id === this.ID_ALTERAR_NOME) {

      } else if (value.id === this.ID_ALTERAR_CONTATO) {

      }
    }

  }

  get opcaoSelecionada() {
    return  this.getOpcoesForm().get('opcao').value != null ? this.getOpcoesForm().get('opcao').value.id : null;
  }

  getOpcoesForm(): FormGroup {
    return this.opcoesForm;
  }

}
