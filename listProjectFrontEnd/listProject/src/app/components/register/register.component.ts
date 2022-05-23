import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  signupForm= new FormGroup({});
  err=null;

  constructor(public fb: FormBuilder, public router: Router, public jwtService: AuthService, ) {
  this.mainForm();
  }

 mainForm(){
  this.signupForm= this.fb.group
  ({
    'name': ['',Validators.required],
    'email': ['',Validators.required],
    'password':['',Validators.required] ,
    'password_confirmation':['',Validators.required]
  })
}

  ngOnInit(): void {
  }


  onSubmit() {
    this.jwtService.register(this.signupForm.value).subscribe(
      res => {
        console.log(res)
      },
      error => {
        this.err = error.error;
      },
      () => {
        this.signupForm.reset()
        this.router.navigate(['login']);
      }
    )
  }

}
