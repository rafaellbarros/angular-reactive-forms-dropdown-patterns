import { FormGroup } from '@angular/forms';

export interface AlterarNomeBlocInterface {
  getAlterarNomeForm(): FormGroup;
  ngOnInit(): void;
}
