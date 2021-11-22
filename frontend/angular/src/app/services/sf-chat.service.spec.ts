import { TestBed } from '@angular/core/testing';

import { SfChatService } from './sf-chat.service';

describe('SfChatService', () => {
  let service: SfChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SfChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
