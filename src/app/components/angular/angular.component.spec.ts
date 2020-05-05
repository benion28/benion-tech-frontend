import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularComponent } from './angular.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AngularComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AngularComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AngularComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Benion-Tech'`, () => {
    const fixture = TestBed.createComponent(AngularComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Benion-Tech');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AngularComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Benion-Tech app is running!');
  });
});
