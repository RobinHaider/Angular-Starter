import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {
    path: 'forms',
    component: FormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
