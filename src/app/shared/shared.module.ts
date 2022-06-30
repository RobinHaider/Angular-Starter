import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextInputComponent } from './components/text-input/text-input.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { TextareaInputComponent } from './components/textarea-input/textarea-input.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { CheckboxInputComponent } from './components/checkbox-input/checkbox-input.component';
import { RadioInputComponent } from './components/radio-input/radio-input.component';
import { FileInputComponent } from './components/file-input/file-input.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    TextareaInputComponent,
    DateInputComponent,
    TimeInputComponent,
    CheckboxInputComponent,
    RadioInputComponent,
    FileInputComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TextInputComponent,
    SelectInputComponent,
    TextareaInputComponent,
    DateInputComponent,
    TimeInputComponent,
    CheckboxInputComponent,
    RadioInputComponent,
    FileInputComponent,
  ],
})
export class SharedModule {}
