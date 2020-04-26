import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizNewComponent } from './quiz-new/quiz-new.component';
import { QuestionNewComponent } from './question-new/question-new.component';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth-guard.service';
import { 
  RoleGuardService as RoleGuard 
} from './role-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuizUpdateComponent } from './quiz-update/quiz-update.component';
import { QuizDeleteComponent } from './quiz-delete/quiz-delete.component';
import { QuestionUpdateComponent } from './question-update/question-update.component';
import { QuestionDeleteComponent } from './question-delete/question-delete.component';

const routes: Routes = [  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'quiz-list', component: QuizListComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
{path: 'quiz-new', component: QuizNewComponent, canActivate: [RoleGuard],
data: { 
  expectedRole: 'instructor'
} },
{path: 'quiz-update', component: QuizUpdateComponent, canActivate: [RoleGuard],
data: { 
  expectedRole: 'instructor'
} },
{path: 'quiz-delete', component: QuizDeleteComponent, canActivate: [RoleGuard],
data: { 
  expectedRole: 'instructor'
} },
{path: 'question-new', component: QuestionNewComponent, canActivate: [RoleGuard],
data: { 
  expectedRole: 'instructor'
}
,
//    resolve: {results: ExampleRouteResolver},
    runGuardsAndResolvers: 'always'
},
{path: 'question-update', component: QuestionUpdateComponent, canActivate: [RoleGuard],
data: { 
  expectedRole: 'instructor'
} },
{path: 'question-delete', component: QuestionDeleteComponent, canActivate: [RoleGuard],
data: { 
  expectedRole: 'instructor'
} },
{path: 'question-list', component: QuestionListComponent, canActivate: [AuthGuard]},
{path: 'answers-list', component: AnswersListComponent, canActivate: [AuthGuard]},
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
