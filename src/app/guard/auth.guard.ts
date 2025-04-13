import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router)
    const isAuth = await inject(AuthService).hasAuth();
    if (!isAuth) {
        router.navigate(['/login']);
    }
    return !!isAuth;
}

export const antiAuthGuard: CanActivateFn = async (route, state) => {
    const router = inject(Router)
    const isAuth = await inject(AuthService).hasAuth();
    if (isAuth) {
        router.navigate(['/home']);
    }
    return !isAuth;
}

