import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSmaxComponent } from './smax/all-smax/all-smax.component';
import { AddSmaxComponent } from './smax/add-smax/add-smax.component';
import { EditSmaxComponent } from './smax/edit-smax/edit-smax.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path:'',
  component: AllSmaxComponent,
},{
  path:'add-smax',
  component: AddSmaxComponent,
},{
  path:'edit-smax/:id',
  component: EditSmaxComponent,
},{
  path:'login',
  component: LoginComponent,
},{
  path:'register',
  component: RegisterComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
