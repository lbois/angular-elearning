import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css']
})
export class QuestionUpdateComponent implements OnInit {
  @Input()
  id:string;
  quizId:string;
  private sub:any;
  question_text:string;
  answers:string[] = new Array(4);
  correct_answer_index:number;
  navigationSubscription;
  showErrorMessage;
  errorMessage;

  constructor(private router:Router, private route:ActivatedRoute, private questionService:QuestionService) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

  }

  initialiseInvites() {
    this.question_text='';
    this.answers = new Array(4);
    this.correct_answer_index=undefined;
  }

  ngOnInit() {
    this.route.queryParams
      //.filter(params => params.quizId)
      .subscribe(params => {
        console.log(params);
        this.id=params['id'];
        this.quizId = params['quizId'];
      });

      this.questionService.findById(this.id).subscribe(
          (res) => {
            this.question_text = res.question_text;
            this.answers=res.answers;
            this.correct_answer_index = res.correct_answer_index;
            this.quizId = res.quiz;

        console.log(JSON.stringify(this.quizId));

        },
        err => {
          // console.log('Error', err);
    
          this.showErrorMessage = true;
          this.errorMessage = err.error.message;
          
    
        }
        );
  }

  update() {
    console.log(this.quizId);
    this.questionService.update(this.id, this.question_text, this.answers, this.correct_answer_index, 
      this.quizId).subscribe(
        (res) => {
          this.id = res.id;
          // this.router.navigate(['question-new'], {queryParams: {refresh: new Date().getTime(), quizId: this.quizId}})
            
          this.router.navigate(['question-list'], {queryParams: {refresh: new Date().getTime(), quizId: this.quizId}})
          
      },
      err => {
        // console.log('Error', err);
  
        this.showErrorMessage = true;
        this.errorMessage = err.error.message;
        
  
      }
      );
  }
}
