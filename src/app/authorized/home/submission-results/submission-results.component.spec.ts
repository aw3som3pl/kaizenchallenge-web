import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionResultsComponent } from './submission-results.component';

describe('SubmissionResultsComponent', () => {
  let component: SubmissionResultsComponent;
  let fixture: ComponentFixture<SubmissionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
