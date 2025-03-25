import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { WorkspacePageComponent } from './page/workspace-page/workspace-page.component';
import { LoginComponent } from './page/login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'w/:id', component: WorkspacePageComponent },
    { path: '',    redirectTo: 'login',    pathMatch: 'full'  }
];
