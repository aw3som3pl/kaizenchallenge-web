import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLikesComponent } from './sub-likes.component';

describe('SubLikesComponent', () => {
  let component: SubLikesComponent;
  let fixture: ComponentFixture<SubLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
