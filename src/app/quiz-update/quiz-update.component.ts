import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-update',
  templateUrl: './quiz-update.component.html',
  styleUrls: ['./quiz-update.component.css']
})
export class QuizUpdateComponent implements OnInit {
  id:string;
  title:string;
  description:string;
  author:string;

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

      this.quizService.findById(this.id).subscribe(
        (res) => {
            this.title = res.title;
            this.description=res.description;
            this.author=res.author;
        },
        err => {
          // console.log('Error', err);
 
          this.showErrorMessage = true;
          this.errorMessage = err.error.message;
          
 
        });
  }

  update() {
    this.quizService.update(this.id, this.title, this.description, this.author)
    .subscribe(
      (res) => {
        this.router.navigate(['quiz-list']);
    },
    err => {
      // console.log('Error', err);

      this.showErrorMessage = true;
      this.errorMessage = err.error.message;
      

    }
    );

  }
}
