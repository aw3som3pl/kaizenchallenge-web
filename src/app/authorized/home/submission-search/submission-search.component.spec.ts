import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionSearchComponent } from './submission-search.component';

describe('SubmissionSearchComponent', () => {
  let component: SubmissionSearchComponent;
  let fixture: ComponentFixture<SubmissionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
