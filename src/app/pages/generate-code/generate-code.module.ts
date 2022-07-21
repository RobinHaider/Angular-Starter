import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateCodeRoutingModule } from './generate-code-routing.module';
import { FormCodeComponent } from './components/form-code/form-code.component';
import { ApiCodeComponent } from './components/api-code/api-code.component';


@NgModule({
  declarations: [
    FormCodeComponent,
    ApiCodeComponent
  ],
  imports: [
    CommonModule,
    GenerateCodeRoutingModule
  ]
})
export class GenerateCodeModule { }
