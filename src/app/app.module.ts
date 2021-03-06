import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { JwtHelperService, JwtModule,  } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { QuizService } from './quiz.service';
import { QuizNewComponent } from './quiz-new/quiz-new.component';
import { QuestionNewComponent } from './question-new/question-new.component';
import { QuestionService } from './question.service';
import { QuestionListComponent } from './question-list/question-list.component';
import { AnswersListComponent } from './answers-list/answers-list.component';
import {AuthGuardService} from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { RoleGuardService } from './role-guard.service';
import { QuizUpdateComponent } from './quiz-update/quiz-update.component';
import { QuizDeleteComponent } from './quiz-delete/quiz-delete.component';
import { QuestionUpdateComponent } from './question-update/question-update.component';
import { QuestionDeleteComponent } from './question-delete/question-delete.component';

export function jwtTokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    QuizListComponent,
    QuizNewComponent,
    QuestionNewComponent,
    QuestionListComponent,
    AnswersListComponent,
    HomeComponent,
    QuizUpdateComponent,
    QuizDeleteComponent,
    QuestionUpdateComponent,
    QuestionDeleteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, FormsModule,JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [RoleGuardService, AuthGuardService, JwtHelperService, AuthService, HttpClient, QuizService, QuestionService,
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
