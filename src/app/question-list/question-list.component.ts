import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';

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

  constructor(private questionService:QuestionService) { }

  ngOnInit() {
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
  }

}
