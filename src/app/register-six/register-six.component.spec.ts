import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSixComponent } from './register-six.component';

describe('RegisterSixComponent', () => {
  let component: RegisterSixComponent;
  let fixture: ComponentFixture<RegisterSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
