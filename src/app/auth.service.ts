import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

export interface MyJwtToken {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, 
    private http: HttpClient,
  ) { }


  login(username:string, password:string) {
    // console.log(this.env.apiUrl );
      return this.http.post<MyJwtToken>("http://localhost:3000/auth/signin", {username, password})
      .pipe(map(res => {
        this.setSession(res.accessToken);
        console.log('login: ' + res.accessToken);
        
      },
      error => {
        console.log('Error', error);
        // console.log(error.error.message);
        return Observable.throw(error);
      }));  
      

  }

  register(username:string, password:string, profile:string) {
    // console.log(this.env.apiUrl );
      return this.http.post<MyJwtToken>("http://localhost:3000/auth/signup", {username, password,profile})
      .pipe(map(res => {
        console.log('register: ' + res);
        //this.setSession(res.accessToken);
        
      },
      error => {
        console.log('Error', error);
        // console.log(error.error.message);
        return Observable.throw(error);
      }));  
      

  }

  private setSession(authResult) {
    // console.log(authResult);
    localStorage.setItem('token', authResult);
  }  
}
