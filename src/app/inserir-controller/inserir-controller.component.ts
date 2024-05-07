import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UnderageService } from '../underage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { IUnderage } from '../underage';

@Component({
  selector: 'app-inserir-controller',
  standalone: true,
  templateUrl: './inserir-controller.component.html',
  styleUrls: ['./inserir-controller.component.css'],
  imports: [CommonModule, NavBarComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
})
export class UnderageControllerComponent implements OnInit {
  showForm: boolean = false;
  novoCadastroForm: any;
  chave: string = "chaveDeEncriptacao123"

  constructor(private fb: FormBuilder, private underageService: UnderageService) { }

  ngOnInit(): void {
    this.novoCadastroForm = this.fb.group({
      nomeCompleto: [null, Validators.required],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      nomeResponsavel: [null, Validators.required],
      emailResponsavel: [null, Validators.required],
      telefoneResponsavel: [null, Validators.required],
    });
  }

  mascaraCpf(cpf: String) {

  }
  mascaraTelefone(telefone: String) {

  }
  encryptData(data, key) {
    var iv = CryptoJS.lib.WordArray.random(16); // IV aleatório
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString() + iv.toString()
  }
  criarCadastro(): void {
    if (this.novoCadastroForm.valid) {
      const novoCadastro: IUnderage = this.novoCadastroForm.value;
      novoCadastro.cpf = this.encryptData(novoCadastro.cpf, this.chave)
      novoCadastro.dataNascimento = this.encryptData(novoCadastro.dataNascimento, this.chave)
      this.underageService.criarCadastro(novoCadastro).subscribe(() => {
        this.novoCadastroForm.reset();
      });
    }
  }
}
