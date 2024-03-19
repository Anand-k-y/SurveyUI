import { TestBed } from '@angular/core/testing';

import { HierarchyServiceService } from './hierarchy-service.service';

describe('HierarchyServiceService', () => {
  let service: HierarchyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HierarchyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
