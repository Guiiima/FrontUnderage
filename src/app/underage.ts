export class IUnderage {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: Date;
  nomeResponsavel: string;
  emailResponsavel: string;
  telefoneResponsavel: string;

  constructor(
    nomeCompleto: string,
    cpf: string,
    dataNascimento: Date,
    nomeResponsavel: string,
    emailResponsavel: string,
    telefoneResponsavel: string
  ) {
    this.nomeCompleto = nomeCompleto;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.nomeResponsavel = nomeResponsavel;
    this.emailResponsavel = emailResponsavel;
    this.telefoneResponsavel = telefoneResponsavel;
  }
}
