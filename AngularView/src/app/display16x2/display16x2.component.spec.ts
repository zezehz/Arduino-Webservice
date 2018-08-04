import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Display16x2Component } from './display16x2.component';

describe('Display16x2Component', () => {
  let component: Display16x2Component;
  let fixture: ComponentFixture<Display16x2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Display16x2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Display16x2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
