import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username:string;
    password:string;
    showErrorMessage = false;
    errorMessage = '';

    returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
       this.authService.login(this.username, this.password)
       .subscribe(
       () => {
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

}
