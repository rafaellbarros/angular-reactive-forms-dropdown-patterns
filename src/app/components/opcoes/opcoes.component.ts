import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OpcoesService } from './opcoes.service';
import { Opcao } from '../models/opcoes.model';

@Component({
  selector: 'opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.css']
})
export class OpcoesComponent implements OnInit {

  opcoesForm: FormGroup;
  formInitialize = false;


  opcoes: Opcao[];

  constructor(private fb: FormBuilder, private opcoesService: OpcoesService) { }

  ngOnInit() {
    this.initForm();
    this.opcoes = this.opcoesService.opcoes;
    console.log(this.opcoes)
  }


  private initForm(): void {
    this.opcoesForm = this.fb.group({
      opcao: ['']
    });
    this.formInitialize = true;
  }

}
