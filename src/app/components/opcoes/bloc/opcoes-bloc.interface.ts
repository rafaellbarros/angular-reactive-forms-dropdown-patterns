import { FormGroup } from '@angular/forms';
import { Opcao, Solicitacao } from '../../models';

export interface OpcoesBlocInterface {
  ngOnInit(): void;
  getOpcoes(): Opcao[];
  getOpcaoSelecionada(): number;
  getDados(): Solicitacao;
  getOpcoesForm(): FormGroup;
  getFormInitialize(): boolean;
  addFormControl(nome: string, formGroup: FormGroup): void;
}
