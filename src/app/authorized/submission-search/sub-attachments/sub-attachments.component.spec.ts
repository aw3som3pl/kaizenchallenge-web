import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAttachmentsComponent } from './sub-attachments.component';

describe('SubAttachmentsComponent', () => {
  let component: SubAttachmentsComponent;
  let fixture: ComponentFixture<SubAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
