import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'alterar-contato',
  templateUrl: './alterar-contato.component.html',
  styleUrls: ['./alterar-contato.component.css']
})
export class AlterarContatoComponent implements OnInit {

  @Input()
  alterarContatoForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get emailControl(): AbstractControl {
    return  this.alterarContatoForm.controls['email'] as AbstractControl;
  }

}
