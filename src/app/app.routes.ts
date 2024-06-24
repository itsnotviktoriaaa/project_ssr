import { HotelTypesComponent } from 'views/public/hotel-types/hotel-types.component';
import { unAuthGuard } from 'core/guards/unauth.guard';
import { LayoutComponent } from 'components/';
import { SignupComponent } from 'app/views';
import { LoginComponent } from 'app/views';
import { HomeComponent } from 'app/views';
import { MainComponent } from 'app/views';
import { Routes } from '@angular/router';
import { authGuard } from 'app/core';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [unAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [unAuthGuard] },
  { path: 'hotel-types', component: HotelTypesComponent },
  {
    path: 'personal',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [{ path: '', component: HomeComponent }],
  },
  { path: '**', redirectTo: '' },
];
