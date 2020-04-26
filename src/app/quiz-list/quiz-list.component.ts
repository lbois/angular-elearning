import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

  }
  navigationSubscription;
  quizList= []
  showErrorMessage;
  errorMessage;
  role;
  username;

  initialiseInvites() {
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
