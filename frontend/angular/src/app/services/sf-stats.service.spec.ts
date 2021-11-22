import { TestBed } from '@angular/core/testing';

import { SfStatsService } from './sf-stats.service';

describe('SfStatsService', () => {
  let service: SfStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
