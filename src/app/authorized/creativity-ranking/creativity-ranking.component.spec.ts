import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativityRankingComponent } from './creativity-ranking.component';

describe('CreativityRankingComponent', () => {
  let component: CreativityRankingComponent;
  let fixture: ComponentFixture<CreativityRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreativityRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreativityRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
