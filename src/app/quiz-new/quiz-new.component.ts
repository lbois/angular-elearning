import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-new',
  templateUrl: './quiz-new.component.html',
  styleUrls: ['./quiz-new.component.css']
})
export class QuizNewComponent implements OnInit {
  id:string;
  title:string;
  description:string;
  author:string;

  showErrorMessage=false;
  errorMessage;

  constructor(private router:Router, private route: ActivatedRoute, private quizService:QuizService) { }

  ngOnInit() {
    
  }

  create() {
    this.quizService.create(this.title, this.description, this.author)
    .subscribe(
      (res) => {
        this.id = res.id;
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
