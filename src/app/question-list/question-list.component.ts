import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quizId:string;

  questions = [];
  showErrorMessage;
  errorMessage;
  role;
  username;

  constructor(private route:ActivatedRoute, private questionService:QuestionService) { }

  ngOnInit() {
    this.route.queryParams
      //.filter(params => params.quizId)
      .subscribe(params => {
        console.log(params);

        this.quizId = params['quizId'];
        console.log(this.quizId); 
      });

    this.questionService.getList(this.quizId)
      .subscribe(
       (res) => {
           this.questions = res;
       },
       err => {
         // console.log('Error', err);

         this.showErrorMessage = true;
         this.errorMessage = err.error.message;
         

       }
      );

      let token = localStorage.getItem('token');
      let helper:JwtHelperService = new JwtHelperService()
    let decodedToken = helper.decodeToken(token);
    decodedToken=JSON.parse(JSON.stringify(decodedToken));
    this.role = decodedToken.role;
    this.username = decodedToken.username
  }

}
