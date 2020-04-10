import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        request = request.clone({
            headers: request.headers.set("X-Foo", 'bar ') 
            
        });
        
        let isAuthenticated = this.authService.isAuthenticated();
        // get Token

        let token = localStorage.getItem('token');
        
        if (isAuthenticated && token) {

            const updatedRequest:HttpRequest<any> = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + token)
              });
        
            

            return next.handle(updatedRequest);
        }
        else {
            return next.handle(request);
        }
        
    }
}