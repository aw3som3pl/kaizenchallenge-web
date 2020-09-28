import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubReviewsComponent } from './sub-reviews.component';

describe('SubReviewsComponent', () => {
  let component: SubReviewsComponent;
  let fixture: ComponentFixture<SubReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
