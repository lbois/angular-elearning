import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient,) { }

  getList(role:string):Observable<any> {
    console.log(role);
    if (role === 'student') {
      console.log('Call HTTP GET (Answers)')
      return this.http.get<any>("http://localhost:3000/answers/quizes", {})
      .pipe(map(res => {
        console.log('getList (answers): ' + res);
        //this.setSession(res.accessToken);
        return res;
        
      },
      error => {
        console.log('Error', error);
        // console.log(error.error.message);
        return Observable.throw(error);
      })); 
    } else {
      console.log('Call HTTP GET')
    return this.http.get<any>("http://localhost:3000/quizes", {})
    .pipe(map(res => {
      console.log('getList: ' + res);
      //this.setSession(res.accessToken);
      return res;
      
    },
    error => {
      console.log('Error', error);
      // console.log(error.error.message);
      return Observable.throw(error);
    })); 
  }
  }


  create(title:string, description:string, author:string):Observable<any> {
    return this.http.post<any>("http://localhost:3000/quizes", {title, description, author})
    .pipe(map(res => {
      console.log('create: ' + res);
      //this.setSession(res.accessToken);
      return res;
      
    },
    error => {
      console.log('Error', error);
      // console.log(error.error.message);
      return Observable.throw(error);
    })); 

  }
}
