import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';

export function jwtTokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
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
  providers: [JwtHelperService, AuthService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
