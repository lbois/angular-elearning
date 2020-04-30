import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Question } from './question.interface';
import { Answer } from './answer.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private http:HttpClient) { }

  getList(quizId):Observable<Question[]> {
    console.log('Call HTTP GET')
    return this.http.get<any>(environment.url.back + "/answers/questions?quizId="+quizId, {})
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

  create(quizId, answer_pct): Observable<Answer> {
    return this.http.post<any>(environment.url.back + "/answers", {quizId, answer_pct})
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
