import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZDMxOTEzZC05ZjMxLTRkMTYtYjgyOS0yZWZjYTQ1ZjNmZjMiLCJpYXQiOjE3NDI4NDU0MDEsImV4cCI6MTc0MzQ1MDIwMX0._VRFAc0boFo69kDSN79jMwFZY2I3pOyIxlAZ88ITj9o'
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
