import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface RadioOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
})
export class RadioInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() options!: RadioOption[];

  @Input() appearance = 'fill';

  constructor() {}

  ngOnInit(): void {}
}
