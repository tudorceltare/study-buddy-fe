import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthenticationService} from "../service/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private host = environment.apiUrl;
  private loginEndpoint = environment.apiEndpoints.login;
  private registerEndpoint = environment.apiEndpoints.register;

  constructor(private authenticationService: AuthenticationService) {}

  intercept(httpRequest: HttpRequest<unknown>, httpHandler: HttpHandler): Observable<HttpEvent<unknown>> {
    if(httpRequest.url.includes(this.host + this.loginEndpoint)) {
      return httpHandler.handle(httpRequest)
    }
    if(httpRequest.url.includes(this.host + this.registerEndpoint)) {
      return httpHandler.handle(httpRequest)
    }
    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const request = httpRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    return httpHandler.handle(request);
  }
}
