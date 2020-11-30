import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrStatsComponent } from './usr-stats.component';

describe('UsrStatsComponent', () => {
  let component: UsrStatsComponent;
  let fixture: ComponentFixture<UsrStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
