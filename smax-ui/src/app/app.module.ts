import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllSmaxComponent } from './smax/all-smax/all-smax.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AddSmaxComponent } from './smax/add-smax/add-smax.component';
import { FormsModule } from '@angular/forms';
import { EditSmaxComponent } from './smax/edit-smax/edit-smax.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    AllSmaxComponent,
    LoginComponent,
    AddSmaxComponent,
    EditSmaxComponent,
    RegisterComponent,
    LogoutComponent,
    NavbarComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('currentUser'),
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
