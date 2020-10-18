import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTaskEditComponent } from './upload-task-edit.component';

describe('UploadTaskEditComponent', () => {
  let component: UploadTaskEditComponent;
  let fixture: ComponentFixture<UploadTaskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTaskEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
