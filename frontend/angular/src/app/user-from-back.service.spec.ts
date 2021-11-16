import { TestBed } from '@angular/core/testing';

import { UserFromBackService } from './user-from-back.service';

describe('UserFromBackService', () => {
  let service: UserFromBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFromBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
