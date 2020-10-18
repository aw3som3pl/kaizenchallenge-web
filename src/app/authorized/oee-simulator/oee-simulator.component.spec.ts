import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeSimulatorComponent } from './oee-simulator.component';

describe('OeeSimulatorComponent', () => {
  let component: OeeSimulatorComponent;
  let fixture: ComponentFixture<OeeSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OeeSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OeeSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
