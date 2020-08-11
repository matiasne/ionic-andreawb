import { TestBed } from '@angular/core/testing';

import { BaseCRUDService } from './base-crud.service';

describe('BaseCRUDService', () => {
  let service: BaseCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
