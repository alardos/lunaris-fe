import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZDMxOTEzZC05ZjMxLTRkMTYtYjgyOS0yZWZjYTQ1ZjNmZjMiLCJpYXQiOjE3NDI3NjgxNzUsImV4cCI6MTc0MzM3Mjk3NX0.iP4zYzXu-gHGrE5NTohUJ_puHyIfGXoR5-sTnoDH7Cw'
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
