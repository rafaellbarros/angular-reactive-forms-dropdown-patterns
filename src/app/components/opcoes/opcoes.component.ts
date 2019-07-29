import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao } from '../models/opcoes.model';
import { Constants } from 'src/app/shared/constants';


@Component({
  selector: 'opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css']
})
export class OpcoesComponent implements OnInit {

  public readonly ID_ALTERAR_NOME = Constants.ID_ALTERAR_NOME;
  public readonly ID_ALTERAR_CONTATO = Constants.ID_ALTERAR_CONTATO;

  opcoesForm: FormGroup;
  formInitialize = false;

  opcoes: Opcao[];

  constructor(private fb: FormBuilder, private opcoesService: OpcoesService) { }

  ngOnInit() {
    this.initForm();
    this.opcoes = this.opcoesService.opcoes;
  }


  private initForm(): void {
    this.opcoesForm = this.fb.group({
      opcao: ['']
    });
    this.formInitialize = true;
  }

  onChangeOpcoes(event) {
    console.warn(event);
  }

  get opcaoSelecionada() {
    return  this.getOpcoesForm().get('opcao').value != null ? this.getOpcoesForm().get('opcao').value.id : null;
  }

  getOpcoesForm(): FormGroup {
    return this.opcoesForm;
  }

}
