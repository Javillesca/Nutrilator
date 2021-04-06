import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ResultComponent } from './result/result.component';
import { ClientComponent } from './client/client.component';
import { MetabolismPipe } from './core/pipes/metabolism.pipe';
import { GenderPipe } from './core/pipes/gender.pipe';
import { ImcPipe } from './core/pipes/imc.pipe';
import { POverweightPipe } from './core/pipes/p-overweight.pipe';
import { EditClientComponent } from './edit-client/edit-client.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserComponent } from './admin/user/user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { environment } from '../environments/environment.prod';
import { ForgotPassComponent } from './admin/forgot-pass/forgot-pass.component';
import { DateFormatePipe } from './core/pipes/date-formate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    ResultComponent,
    ClientComponent,
    MetabolismPipe,
    GenderPipe,
    ImcPipe,
    POverweightPipe,
    EditClientComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    UserComponent,
    EditUserComponent,
    ForgotPassComponent,
    DateFormatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
