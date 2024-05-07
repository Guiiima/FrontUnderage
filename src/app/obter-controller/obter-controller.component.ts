import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IUnderage } from '../underage'
import { MatIconModule } from '@angular/material/icon';
import { UnderageService } from '../underage.service';

@Component({
    selector: 'app-obter-controller',
    standalone: true,
    templateUrl: './obter-controller.component.html',
    styleUrl: './obter-controller.component.css',
    imports: [CommonModule, NavBarComponent, MatTableModule,MatIconModule]
})
export class ObterControllerComponent {
  displayedColumns: string[] = ['cpf', 'nomeCompleto', 'emailResponsavel', 'telefoneResponsavel', 'nomeResponsavel'];
  dataSource: CdkTableDataSourceInput<IUnderage> = new MatTableDataSource<IUnderage>();

  constructor(
    private readonly underageService: UnderageService
  ){}
  ngOnInit(){
    this.obterLista();
  }
  async obterLista(){
    await this.underageService.ObterLista().subscribe(underage =>{
      this.dataSource = new MatTableDataSource<IUnderage>(underage);
    })
  }
}
