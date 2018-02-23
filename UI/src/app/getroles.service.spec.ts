import { TestBed, inject } from '@angular/core/testing';

import { GetrolesService } from './getroles.service';

describe('GetrolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetrolesService]
    });
  });

  it('should be created', inject([GetrolesService], (service: GetrolesService) => {
    expect(service).toBeTruthy();
  }));
});
