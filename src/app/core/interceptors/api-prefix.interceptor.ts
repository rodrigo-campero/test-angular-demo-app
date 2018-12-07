import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiPrefix implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = 'http://localhost:9915';
        request = request.clone({
            url: `${url}/${request.url}`,
            setHeaders: {
                'Content-Type': 'application/json'
            }
        });
        return next.handle(request);
    }
}
