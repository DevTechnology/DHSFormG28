import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { GetrolesService } from './getroles.service';

describe('GetrolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetrolesService,  { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([GetrolesService], (service: GetrolesService) => {
    expect(service).toBeTruthy();
  }));
});
