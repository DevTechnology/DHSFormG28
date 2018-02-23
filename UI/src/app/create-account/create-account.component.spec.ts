import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { Router } from '@angular/router';

import { CreateAccountComponent } from './create-account.component';
import {By} from '@angular/platform-browser';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('roles are populated in the dropdown', fakeAsync(() => {
  //   fixture.detectChanges();
  //   const toggleButton = fixture.debugElement.queryAll(By.css('[dropdownToggle]'));
  //   const list = fixture.debugElement.queryAll(By.css('ul.btnOptionBox'));
  //   console.log(list[0]);
  // }));
});
