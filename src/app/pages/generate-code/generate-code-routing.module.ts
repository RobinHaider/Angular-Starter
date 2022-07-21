import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiCodeComponent } from './components/api-code/api-code.component';
import { FormCodeComponent } from './components/form-code/form-code.component';

const routes: Routes = [
  {path: 'reactive-form', component: FormCodeComponent},
  {path: 'api', component: ApiCodeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateCodeRoutingModule { }
