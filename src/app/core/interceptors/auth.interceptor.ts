import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import {  Observable } from 'rxjs';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isAdminRequest = req.url.includes('admin');
    const isEmployeeRequest = req.url.includes('employee');

    let token;
    if (isAdminRequest) {
      console.log("admin req");
      token = localStorage.getItem('admintoken'); 
    } else if (isEmployeeRequest) {
       console.log('employee req');
      token = localStorage.getItem('employeetoken'); 
    }

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
