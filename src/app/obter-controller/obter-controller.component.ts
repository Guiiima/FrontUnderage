import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IUnderage } from '../underage';
import { MatIconModule } from '@angular/material/icon';
import { UnderageService } from '../underage.service';

@Component({
  selector: 'app-obter-controller',
  standalone: true,
  templateUrl: './obter-controller.component.html',
  styleUrl: './obter-controller.component.css',
  imports: [CommonModule, NavBarComponent, MatTableModule, MatIconModule],
})
export class ObterControllerComponent {
  chave: string = this.underageService.chave;
  nodemailer = require('nodemailer');
  tentativa = 0;
  underage: any | undefined
  displayedColumns: string[] = [
    'cpf',
    'nomeCompleto',
    'emailResponsavel',
    'telefoneResponsavel',
    'nomeResponsavel',
  ];
  dataSource: CdkTableDataSourceInput<IUnderage> =
    new MatTableDataSource<IUnderage>();

  constructor(
    private readonly underageService: UnderageService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {}
  formatarData(str: any) {
    if (str.length !== 8) {
      throw new Error('A string deve ter 8 caracteres no formato DDMMYYYY');
    }
    const anoAtual = new Date().getFullYear();
    const ano = str.substring(4, 8);
    const anoDaString = parseInt(ano, 10);
    const idade = anoAtual - anoDaString;
    return idade.toString();
  }

  decrypt(encryptedText: any) {
    const [encrypted, signature] = encryptedText.split('.');
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.chave).toString(
      CryptoJS.enc.Utf8
    );
    const calculatedSignature = CryptoJS.HmacSHA256(
      encrypted,
      this.chave
    ).toString();
    if (calculatedSignature !== signature) {
      throw new Error(
        'A assinatura digital não corresponde. A mensagem pode ter sido alterada.'
      );
    }
    return decrypted;
  }
  gerarStringAleatoria() {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const comprimento = Math.floor(Math.random() * 11); // Gera um número aleatório entre 0 e 10

    let resultado = '';
    for (let i = 0; i < comprimento; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
  }
  async obterLista() {
    const senha = prompt(`Digite a senha de acesso (tentativa ${this.tentativa}):`);
    if (senha === this.underageService.chave) {
      try {
        this.underage = await this.underageService.ObterLista().toPromise();
        await Promise.all(this.underage.map(async (item: { cpf: string; dataNascimento: string; }) => {
          item.cpf = this.decrypt(item.cpf);
          item.dataNascimento = this.formatarData(this.decrypt(item.dataNascimento));
          return item; 
        }));
        this.dataSource = new MatTableDataSource<IUnderage>(this.underage);
      } catch (error) {
        console.error('Erro ao obter a lista:', error);
      }
    } else {
      this.tentativa++;
      if (this.tentativa >= 3) {
        this.tentativa = 0;
        this.underageService.chave = this.gerarStringAleatoria();
        console.log(this.underageService.chave)
      }
    }
  }  
}
