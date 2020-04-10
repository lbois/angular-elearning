import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizNewComponent } from './quiz-new/quiz-new.component';
import { QuestionNewComponent } from './question-new/question-new.component';


const routes: Routes = [{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'quiz-list', component: QuizListComponent},
{path: 'quiz-new', component: QuizNewComponent},
{path: 'question-new', component: QuestionNewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
