import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaScreenComponent } from './qa-screen.component';

describe('QaScreenComponent', () => {
  let component: QaScreenComponent;
  let fixture: ComponentFixture<QaScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
