import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-services/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StartupComponent } from './startup/startup.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  { path: 'startup', canActivate: [AuthGuard], component: StartupComponent },
  { path: 'user/forgot-password', component: ForgotPasswordComponent },
  { path: 'user/reset-password/:id', component: ResetPasswordComponent },
  { path: 'user/profile', canActivate: [AuthGuard], component: UserComponent },
  {
    path: 'user/profile-edit',
    canActivate: [AuthGuard],
    component: UserEditComponent,
  },
  {
    path: 'user/update-password',
    canActivate: [AuthGuard],
    component: UpdatePasswordComponent,
  },
  {
    path: 'user/signup',
    component: SignupComponent,
  },
  {
    path: 'deal',
    loadChildren: () => import('./deal/deal.module').then((m) => m.DealModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
