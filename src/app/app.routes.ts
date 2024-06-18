import { LayoutComponent } from 'components/';
import { SignupComponent } from 'app/views';
import { LoginComponent } from 'app/views';
import { HomeComponent } from 'app/views';
import { MainComponent } from 'app/views';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'personal',
    component: LayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  { path: '**', redirectTo: '' },
];
