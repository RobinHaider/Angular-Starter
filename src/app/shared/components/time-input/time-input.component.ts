import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
})
export class TimeInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = '';

  constructor() {}

  ngOnInit(): void {}
}
