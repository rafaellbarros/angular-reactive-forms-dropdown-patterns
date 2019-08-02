import { FormGroup, FormBuilder } from '@angular/forms';
import { Solicitacao } from '../../models';

export interface AlterarNomeBlocInterface {
  getAlterarNomeForm(): FormGroup;
  ngOnInit(): void;
}
