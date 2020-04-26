import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  getList(quizId):Observable<any> {
    console.log('Call HTTP GET')
    return this.http.get<any>("http://localhost:3000/questions?quizId="+quizId, {})
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

  create(question_text:string, answers:string[],correct_answer_index:number, quizId:string ):Observable<any> {
    console.log('Service POST')
    return this.http.post<any>("http://localhost:3000/questions", 
    {question_text, answers, correct_answer_index, quizId})
    .pipe(map(res => {
      console.log('create: ' + res);
      return res;
      
    },
    error => {
      console.log('Error', error);
      return Observable.throw(error);
    }));
  }

  findById(id:string):Observable<any> {
    return this.http.get<any>("http://localhost:3000/questions/"+id)
    .pipe(map(res => {
      console.log('getById: ' + JSON.stringify(res));
      //this.setSession(res.accessToken);
      return res[0];
      
    },
    error => {
      console.log('Error', error);
      // console.log(error.error.message);
      return Observable.throw(error);
    })); 

  }

  update(id:string, question_text:string, answers:string[], correct_answer_index:number, 
    quizId:string):Observable<any> {
      return this.http.patch<any>("http://localhost:3000/questions/"+id, {question_text, answers, correct_answer_index, quizId})
      .pipe(map(res => {
        return res;
        
      },
      error => {
        console.log('Error', error);
        // console.log(error.error.message);
        return Observable.throw(error);
      }));  
    }

    delete(id:string):Observable<any> {
      return this.http.delete<any>("http://localhost:3000/questions/"+id)
      .pipe(map(res => {
        console.log('delete: ' + res);
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
