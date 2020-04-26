import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.css']
})
export class QuestionDeleteComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private questionService:QuestionService) { }

  id:string;
  quizId:string;
  showErrorMessage:boolean;
  errorMessage:string;
  
  ngOnInit() {
    this.route.queryParams
      //.filter(params => params.quizId)
      .subscribe(params => {
        console.log(params);

        this.id = params['id'];
        this.quizId = params['quizId'];
        console.log(this.quizId); 
      });

      this.questionService.delete(this.id).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['question-list'], {queryParams: {refresh: new Date().getTime(), quizId: this.quizId}})
          
        },
        err => {
          // console.log('Error', err);
 
          this.showErrorMessage = true;
          this.errorMessage = err.error.message;
          
 
        });
  }

}
