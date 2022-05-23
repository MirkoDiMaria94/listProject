import { Injectable } from '@angular/core';
import { TokenAuthService } from '../service/token-auth.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationStateService {
  constructor(
    public tokenAuthService: TokenAuthService
  ) { }


  private userCurrentState = new BehaviorSubject<boolean|undefined>(this.tokenAuthService.isSignedin());
  userAuthState = this.userCurrentState.asObservable();

 
  setAuthState(value: boolean) {
    this.userCurrentState.next(value);
  }

}