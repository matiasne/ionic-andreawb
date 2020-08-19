import { TestBed } from '@angular/core/testing';

import { ArchivosCsvService } from './archivos-csv.service';

describe('ArchivosCsvService', () => {
  let service: ArchivosCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
