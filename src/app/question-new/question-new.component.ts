import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.css']
})
export class QuestionNewComponent implements OnInit {
  @Input()
  id:string;
  quizId:string;
  private sub:any;
  question_text:string;
  answers:string[] = new Array(4);
  correct_answer_index:number;

  showErrorMessage;
  errorMessage;

  constructor(private route:ActivatedRoute, private questionService:QuestionService) { }

  ngOnInit() {
    this.route.queryParams
      //.filter(params => params.quizId)
      .subscribe(params => {
        console.log(params);

        this.quizId = params['quizId'];
        console.log(this.quizId); 
      });
  }

  create() {
    console.log(this.quizId);
    this.questionService.create(this.question_text, this.answers, this.correct_answer_index, 
      this.quizId).subscribe(
        (res) => {
          this.id = res.id;
      },
      err => {
        // console.log('Error', err);
  
        this.showErrorMessage = true;
        this.errorMessage = err.error.message;
        
  
      }
      );
  }

}
