import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menus',
  templateUrl: './side-menus.component.html',
  styleUrls: ['./side-menus.component.scss'],
})
export class SideMenusComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  panelOpenState = false;
}
