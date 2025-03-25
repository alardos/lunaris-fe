import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZDMxOTEzZC05ZjMxLTRkMTYtYjgyOS0yZWZjYTQ1ZjNmZjMiLCJpYXQiOjE3NDI5MzQwNzksImV4cCI6MTc0MzUzODg3OX0.A3iZ0UpGeU2YEKduksvZiF28xHhe4gxlRfiSVODnU1E'
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
