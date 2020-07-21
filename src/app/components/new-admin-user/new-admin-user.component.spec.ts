import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdminUserComponent } from './new-admin-user.component';

describe('NewAdminUserComponent', () => {
  let component: NewAdminUserComponent;
  let fixture: ComponentFixture<NewAdminUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdminUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
