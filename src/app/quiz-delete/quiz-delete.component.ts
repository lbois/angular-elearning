import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-delete',
  templateUrl: './quiz-delete.component.html',
  styleUrls: ['./quiz-delete.component.css']
})
export class QuizDeleteComponent implements OnInit {
  id:string;

  showErrorMessage=false;
  errorMessage;

  constructor(private router:Router, private route: ActivatedRoute, 
    private quizService:QuizService) { }

  ngOnInit() {
    this.route.queryParams
      //.filter(params => params.quizId)
      .subscribe(params => {
        console.log(params);

        this.id = params['id'];
        console.log(this.id); 
      });

      this.quizService.delete(this.id).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['quiz-list']);
        },
        err => {
          // console.log('Error', err);
 
          this.showErrorMessage = true;
          this.errorMessage = err.error.message;
          
 
        });
  }

}
