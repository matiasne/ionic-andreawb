import { TestBed } from '@angular/core/testing';

import { BaseCrudFirestoreService } from './base-crud-firestore.service';

describe('BaseCrudFirestoreService', () => {
  let service: BaseCrudFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCrudFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
