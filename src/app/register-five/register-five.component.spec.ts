import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFiveComponent } from './register-five.component';

describe('RegisterFiveComponent', () => {
  let component: RegisterFiveComponent;
  let fixture: ComponentFixture<RegisterFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
