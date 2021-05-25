import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImageGalleryComponent } from './admin-image-gallery.component';

describe('AdminImageGalleryComponent', () => {
  let component: AdminImageGalleryComponent;
  let fixture: ComponentFixture<AdminImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminImageGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
