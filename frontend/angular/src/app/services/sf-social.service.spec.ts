import { TestBed } from '@angular/core/testing';

import { SfSocialService } from './sf-social.service';

describe('SfSocialService', () => {
  let service: SfSocialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfSocialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
