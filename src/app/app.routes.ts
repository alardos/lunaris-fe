import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { WorkspacePageComponent } from './page/workspace-page/workspace-page.component';
import { LoginComponent } from './page/login/login.component';
import { antiAuthGuard, authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [antiAuthGuard] },
    { path: 'w/:id', component: WorkspacePageComponent, canActivate: [authGuard] },
    { path: '',    redirectTo: 'login',    pathMatch: 'full'  }
];
