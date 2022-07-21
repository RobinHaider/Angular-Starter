import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCodeComponent } from './api-code.component';

describe('ApiCodeComponent', () => {
  let component: ApiCodeComponent;
  let fixture: ComponentFixture<ApiCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
