import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCodeComponent } from './form-code.component';

describe('FormCodeComponent', () => {
  let component: FormCodeComponent;
  let fixture: ComponentFixture<FormCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
