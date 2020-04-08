import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string;
  password:string;
  profile:string;

  showErrorMessage = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    if (this.username && this.password && this.profile) {
      this.authService.register(this.username, this.password, this.profile)
      .subscribe(
       () => {
           this.router.navigate(['login']);
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
