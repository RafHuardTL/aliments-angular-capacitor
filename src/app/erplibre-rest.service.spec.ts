import { TestBed } from '@angular/core/testing';

import { ErplibreRestService } from './erplibre-rest.service';

describe('ErplibreRestService', () => {
  let service: ErplibreRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErplibreRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
