import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZDMxOTEzZC05ZjMxLTRkMTYtYjgyOS0yZWZjYTQ1ZjNmZjMiLCJpYXQiOjE3NDI3NTE5NDksImV4cCI6MTc0MzM1Njc0OX0.c8ZkTsjW49ZsIO9MB58WcILfLwybqQmgMDBh4xAwAOY'
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    // const authToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return next(authReq);
    }
    return next(req);
}
