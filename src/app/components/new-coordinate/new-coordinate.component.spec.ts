import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoordinateComponent } from './new-coordinate.component';

describe('NewCoordinateComponent', () => {
  let component: NewCoordinateComponent;
  let fixture: ComponentFixture<NewCoordinateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCoordinateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoordinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
