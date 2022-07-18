import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
})
export class CheckboxInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = '';

  constructor() {}

  ngOnInit(): void {}
}
