import { TestBed } from '@angular/core/testing';

import { AuthenticationRafflesService } from './authentication-raffles.service';

describe('AuthenticationRafflesService', () => {
  let service: AuthenticationRafflesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationRafflesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
