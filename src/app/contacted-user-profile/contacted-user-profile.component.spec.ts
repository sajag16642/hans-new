import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactedUserProfileComponent } from './contacted-user-profile.component';

describe('ContactedUserProfileComponent', () => {
  let component: ContactedUserProfileComponent;
  let fixture: ComponentFixture<ContactedUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactedUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactedUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
