import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from './examples-routing.module';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ExamplesRoutingModule,
    SharedModule,
  ]
})
export class ExamplesModule { }
