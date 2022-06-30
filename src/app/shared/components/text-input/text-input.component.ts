import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() control!: FormControl ;
  @Input() label: string  = '';
  @Input() placeholder: string  = '';

  @Input() type = 'text';

  constructor() {}

  ngOnInit(): void {}
}
