import { TestBed } from '@angular/core/testing';

import { SfUserService } from './sf-user.service';

describe('SfUserService', () => {
  let service: SfUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
