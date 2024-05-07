import { Routes } from '@angular/router';
import { UnderageControllerComponent } from './inserir-controller/inserir-controller.component';
import { ObterControllerComponent } from './obter-controller/obter-controller.component';
export const routes: Routes = [
    { path: 'obterLista', component: UnderageControllerComponent  },
    { path: 'Cadastrar', component:  ObterControllerComponent},

];
