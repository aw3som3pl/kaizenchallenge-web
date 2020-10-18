import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSubmissionViewComponent } from './search-submission-view.component';

describe('SearchSubmissionViewComponent', () => {
  let component: SearchSubmissionViewComponent;
  let fixture: ComponentFixture<SearchSubmissionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSubmissionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSubmissionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
