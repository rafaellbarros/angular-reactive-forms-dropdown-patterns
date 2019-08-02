import { AlterarContatoBlocInterface } from '../alterar-contato-bloc.interface';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlterarContato, Solicitacao } from 'src/app/components/models';

export class AlterarContatoBlocImpl implements AlterarContatoBlocInterface, OnInit {

  private _alterarContatoForm: FormGroup;

  constructor(private _dados: Solicitacao, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.initAlterarContatoForm();
  }

  public getAlterarContatoForm(): FormGroup {
   return this._alterarContatoForm;
  }

  private initAlterarContatoForm(): void {
    const dados: AlterarContato = this.recuperarDadoAlterarContato();
    const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    this._alterarContatoForm = this._fb.group({
      telefone: [dados.telefone],
      email: [dados.email, [ Validators.required, Validators.pattern(emailPattern),  this.emailDomainValidator]]
    });
  }

  private emailDomainValidator(control: FormControl) {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (domain === 'gmail.com') {
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null;
  }

  private recuperarDadoAlterarContato(): AlterarContato {
    const alterarContato: AlterarContato = {
      telefone: '',
      email: '',
    };

    if (this._dados.dados.alterarContato === undefined || this._dados.dados.alterarContato.telefone === null) {
      return alterarContato as AlterarContato;
    } else if (this._dados.dados.opcao.id === 2) {
      return this._dados.dados.alterarContato;
    }
  }

}
