import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { env } from '../../../environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private route: Router) { }

    async login(email:string,password:string) {
        return firstValueFrom(this.http.post(`${env.api}auth/login`,{email,password}))
            .then((data:any) => {
                localStorage.setItem('accessToken',data.accessToken)
                localStorage.setItem('refreshToken',data.refreshToken)
                localStorage.setItem('myId', data.myId)
            })

    }

    refresh(): Promise<string|null> {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) return Promise.resolve(null);
        return firstValueFrom(this.http.post(`${env.api}auth/refresh`,refreshToken))
            .then((data:any) => {
                localStorage.setItem('accessToken',data.accessToken)
                localStorage.setItem('refreshToken',data.refreshToken)
                localStorage.setItem('myId', data.myId)
                return data.accessToken;
            })
            .catch(e => null)

    }

    async logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("myId");
        this.route.navigate(['login']);
    }

    async hasAuth(): Promise<boolean> {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (this.isTokenValid(accessToken)) return true;
        if (this.isTokenValid(refreshToken)) {
            return !!await this.refresh()
        }
        return false;
    }

    isTokenValid(token:string|null) {
        if (!token) return false;
        const payloadBase64 = token.split('.')[1];
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const decodedJwt = JSON.parse(window.atob(base64));
        return decodedJwt.exp > Math.floor(new Date().getTime() / 1000)
    }

}
