import { Component, OnInit } from '@angular/core';
import { UnderageService } from '../underage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IUnderage } from '../underage';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-inserir-controller',
  standalone: true,
  templateUrl: './inserir-controller.component.html',
  styleUrls: ['./inserir-controller.component.css'],
  imports: [
    CommonModule,
    NavBarComponent,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class UnderageControllerComponent implements OnInit {
  showForm: boolean = false;
  novoCadastroForm: any;
  chave: any;
  constructor(
    private fb: FormBuilder,
    private underageService: UnderageService
  ) {}
  
  ngOnInit(): void {
    this.chave = this.underageService.chave;
    this.novoCadastroForm = this.fb.group({
      Nome: [null, Validators.required],
      Cpf: [null, Validators.required],
      DataNascimento: [null, Validators.required],
      NomeResponsavel: [null, Validators.required],
      EmailResponsavel: [null, Validators.required],
      TelefoneResponsavel: [null, Validators.required],
    });
  }
  mascara(text: String) {
    return text.replace(/[.\-()/]/g, '');
  }
  encrypt(text: any) {
    const textWithoutSpecialChars = this.mascara(text);
    const encrypted = CryptoJS.AES.encrypt(textWithoutSpecialChars, this.chave).toString();
    const signature = CryptoJS.HmacSHA256(encrypted, this.chave).toString();
    return encrypted + '.' + signature;
  }
  criarCadastro(): void {
    if (this.novoCadastroForm.valid) {
      const novoCadastro: IUnderage = this.novoCadastroForm.value;
      novoCadastro.Cpf = this.encrypt(novoCadastro.Cpf)
      novoCadastro.DataNascimento = this.encrypt(novoCadastro.DataNascimento)
      this.underageService.criarCadastro(novoCadastro).subscribe(() => {
        this.novoCadastroForm.reset();
      });
    }
  }
}
