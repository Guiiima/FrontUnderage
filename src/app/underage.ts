export class IUnderage {
  Nome: string;
  Cpf: string;
  DataNascimento: string;
  NomeResponsavel: string;
  EmailResponsavel: string;
  TelefoneResponsavel: string;

  constructor(
    Nome: string,
    Cpf: string,
    DataNascimento: string,
    NomeResponsavel: string,
    EmailResponsavel: string,
    TelefoneResponsavel: string
  ) {
    this.Nome = Nome;
    this.Cpf = Cpf;
    this.DataNascimento = DataNascimento;
    this.NomeResponsavel = NomeResponsavel;
    this.EmailResponsavel = EmailResponsavel;
    this.TelefoneResponsavel = TelefoneResponsavel;
  }
}
