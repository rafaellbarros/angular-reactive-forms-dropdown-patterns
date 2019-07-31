export interface Opcao {
  label?: string;
  value: any;
}

export interface OpcaoDto {
  id: number;
  descricao: string;
}

export interface AlterarNome {
  nome: string;
}

export interface AlterarContato {
  telefone: string;
  email: string;
}

export interface Dados {
  opcao: OpcaoDto;
  alterarNome?: AlterarNome;
  alterarContato?: AlterarContato;
}

export interface Solicitacao {
  id: number;
  dados: Dados;
}


