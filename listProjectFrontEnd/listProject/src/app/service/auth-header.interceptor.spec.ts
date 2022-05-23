import { TestBed } from '@angular/core/testing';

import { AuthHeaderInterceptor } from './auth-header.interceptor';

describe('AuthenticationStateService', () => {
  let service: AuthHeaderInterceptor ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHeaderInterceptor );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
