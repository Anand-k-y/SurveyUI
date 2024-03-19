import { TestBed } from '@angular/core/testing';

import { AiengineService } from './aiengine.service';

describe('AiengineService', () => {
  let service: AiengineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiengineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
