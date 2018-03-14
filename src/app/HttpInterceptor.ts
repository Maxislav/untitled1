import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(req)

        const changedReq = req.clone({headers: req.headers.set('My-Header', 'MyHeaderValue')});
        return next.handle(changedReq);
    }
}