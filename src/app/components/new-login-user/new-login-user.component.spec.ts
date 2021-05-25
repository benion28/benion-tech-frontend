import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoginUserComponent } from './new-login-user.component';

describe('NewLoginUserComponent', () => {
  let component: NewLoginUserComponent;
  let fixture: ComponentFixture<NewLoginUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLoginUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
