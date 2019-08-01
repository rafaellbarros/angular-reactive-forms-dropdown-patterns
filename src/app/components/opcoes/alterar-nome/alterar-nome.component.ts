import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alterar-nome',
  templateUrl: './alterar-nome.component.html',
  styleUrls: ['./alterar-nome.component.css']
})
export class AlterarNomeComponent implements OnInit {

  @Input()
  alterarNomeForm: FormGroup;

  @Output()
  formReady = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit() {


    this.formReady.emit(this.alterarNomeForm);
  }

}
