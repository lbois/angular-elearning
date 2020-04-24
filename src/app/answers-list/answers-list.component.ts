import { Component, OnInit } from '@angular/core';
import { AnswersService } from '../answers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question.interface';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css']
})
export class AnswersListComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private router:Router,
    private answersService: AnswersService) { }

  quizId;
  questions: Question[];
  currentQuestionnaire:Question;
  currentIndex=0;
  maxLength=0;
  showErrorMessage:boolean = false;
  errorMessage:string;
  answer_val:number=-1;
  answers = []
  count_correct_answers=0;
  result=0;

  ngOnInit() {
    this.route.queryParams
      //.filter(params => params.quizId)
      .subscribe(params => {
        console.log(params);

        this.quizId = params['quizId'];
        console.log(this.quizId); 
      });

     this.answersService.getList(this.quizId).subscribe(
      (res) => {
          this.questions = res;
          if (this.questions) {
            this.maxLength = this.questions.length;
            this.answers = new Array(this.maxLength);
            this.currentQuestionnaire = this.questions[this.currentIndex];
          }
      },
      err => {
        // console.log('Error', err);

        this.showErrorMessage = true;
        this.errorMessage = err.error.message;
        

      }
     );
  }

  selectedAnswer(select) {
    this.answer_val = select;
    console.log(select)
  }

  next() {
    if (this.answer_val<0) {
      this.showErrorMessage = true;
      this.errorMessage = 'Please select an answer';

    } else {
      this.answers[this.currentIndex] = this.answer_val;
      this.answer_val=-1;
      this.errorMessage='';
      this.showErrorMessage=false;
      this.currentIndex++;
      this.currentQuestionnaire = this.questions[this.currentIndex];
    }

  }

  prev() {
    this.currentIndex--;
    this.currentQuestionnaire = this.questions[this.currentIndex];

  }

  finish() {
    if (this.answer_val<0) {
      this.showErrorMessage = true;
      this.errorMessage = 'Please select an answer';

    } else {
      this.answers[this.currentIndex] = this.answer_val;
      for (let i = 0; i < this.maxLength; i++) {
        if (this.answers[i] === this.questions[i].correct_answer_index ) {
          this.count_correct_answers++;
        }
      }
      this.result = Math.round(this.count_correct_answers / this.maxLength * 100);
      console.log(this.result);
      this.answersService.create(this.quizId, this.result)
      .subscribe();
      this.answer_val=-1;
      this.errorMessage='';
      this.showErrorMessage=false;
      this.currentIndex++;
      this.currentQuestionnaire = null;
    }

  }

}
