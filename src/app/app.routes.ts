import { Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'sidebar',
    component: SideBarComponent,
  },

  { path: '**', redirectTo: '/home' }, // Redirect to home page for invalid routes
];
