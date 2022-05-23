import { Injectable } from '@angular/core';
import { User } from 'src/models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL= environment.API_URL;

  constructor(private http: HttpClient) {  }


  //login
  signin(user:User): Observable<any>{
    return this.http.post(`${this.API_URL}/login`,user)
  }


  //register
  register(user:User): Observable<any>{
    return this.http.post(`${this.API_URL}/register`,user)
  }

  
}
