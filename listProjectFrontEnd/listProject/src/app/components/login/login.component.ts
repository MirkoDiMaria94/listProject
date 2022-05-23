import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';

import { AuthService } from 'src/app/service/auth-service.service';
import { TokenAuthService } from 'src/app/service/token-auth.service';
import { AuthenticationStateService } from 'src/app/service/authentication-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  signinForm:FormGroup;
  err=null;

  constructor(public router:Router,public fb:FormBuilder, public jwtService: AuthService,public tokenAuthService: TokenAuthService, public authenticationStateService: AuthenticationStateService) { 
    this.signinForm= this.fb.group({
      'email': ['',Validators.required],
      'password': ['',Validators.required]
    })
  }

mainForm(){
  this.signinForm= this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  })

}


  ngOnInit(): void {
  }


  

  onSubmit(){
    this.jwtService.signin(this.signinForm.value).subscribe(
      res => {
        this.tokenStorage(res);
      },
      error => {
        this.err = error.error;
      },() => {
        this.authenticationStateService.setAuthState(true);
        this.signinForm.reset()
        this.router.navigate(['home']);
      }
    );
  }

  tokenStorage(jwt:any){
    this.tokenAuthService.setTokenStorage(jwt.access_token);
  }

}
