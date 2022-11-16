import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenusComponent } from './side-menus.component';

describe('SideMenusComponent', () => {
  let component: SideMenusComponent;
  let fixture: ComponentFixture<SideMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
