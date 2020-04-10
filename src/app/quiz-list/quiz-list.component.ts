import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

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

  ngOnInit() {

    console.log('ngOnInit')
    this.quizService.getList()
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
