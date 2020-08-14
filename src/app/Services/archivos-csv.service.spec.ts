import { TestBed } from '@angular/core/testing';

import { ArchivosCSVService } from './archivos-csv.service';

describe('ArchivosCSVService', () => {
  let service: ArchivosCSVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosCSVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
