import { TestBed } from '@angular/core/testing';

import { SfGameService } from './sf-game.service';

describe('SfGameService', () => {
  let service: SfGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
