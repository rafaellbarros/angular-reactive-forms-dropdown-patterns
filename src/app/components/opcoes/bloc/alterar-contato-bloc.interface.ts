import { FormGroup } from '@angular/forms';

export interface AlterarContatoBlocInterface {
  getAlterarContatoForm(): FormGroup;
  ngOnInit(): void;
}
