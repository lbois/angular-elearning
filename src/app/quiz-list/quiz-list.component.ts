import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  constructor(private quizService: QuizService) { }
  quizList= []
  showErrorMessage;
  errorMessage;
  role;
  username;

  ngOnInit() {

    let token = localStorage.getItem('token');
    let helper:JwtHelperService = new JwtHelperService()
    let decodedToken = helper.decodeToken(token);
    decodedToken=JSON.parse(JSON.stringify(decodedToken));
    this.role = decodedToken.role;
    this.username = decodedToken.username;
 
    console.log(decodedToken)

    this.quizService.getList(this.role)
      .subscribe(
       (res) => {
           this.quizList = res;
       },
       err => {
         // console.log('Error', err);

         this.showErrorMessage = true;
         this.errorMessage = err.error.message;
         

       }
      );
  }

}
