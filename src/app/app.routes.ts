import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { WorkspacePageComponent } from './page/workspace-page/workspace-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'w/:id', component: WorkspacePageComponent },
  { path: '',    redirectTo: '/w/xxxxx',    pathMatch: 'full'  }
];
