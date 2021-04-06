import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { ResultComponent } from './result/result.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserComponent } from './admin/user/user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { ForgotPassComponent } from './admin/forgot-pass/forgot-pass.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'main', component: MainComponent, canActivate: [ AuthGuard ]},
  { path: 'profile', component: UserComponent, canActivate: [ AuthGuard ]},
  { path: 'editProfile', component: EditUserComponent, canActivate: [ AuthGuard ]},
  { path: 'forgotPass', component: ForgotPassComponent },
  { path: 'client', component: ClientComponent, canActivate: [ AuthGuard ] },
  { path: 'result/:id', component: ResultComponent, canActivate: [ AuthGuard ] },
  { path: 'edit/:id', component: EditClientComponent, canActivate: [ AuthGuard ]},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
