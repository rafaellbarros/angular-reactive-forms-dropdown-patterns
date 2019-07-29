import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alterar-nome',
  templateUrl: './alterar-nome.component.html',
  styleUrls: ['./alterar-nome.component.css']
})
export class AlterarNomeComponent implements OnInit {

  @Input()
  alterarNomeForm: FormGroup;

  constructor() { }

  ngOnInit() { }

}
