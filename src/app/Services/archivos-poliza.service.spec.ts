import { TestBed } from '@angular/core/testing';

import { ArchivosPolizaService } from './archivos-poliza.service';

describe('ArchivosPolizaService', () => {
  let service: ArchivosPolizaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivosPolizaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
