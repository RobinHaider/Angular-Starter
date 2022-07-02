import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.scss'],
})
export class TextareaInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() placeholder: string = this.label;

  @Input() appearance = 'fill';

  constructor() {}

  ngOnInit(): void {}
}
