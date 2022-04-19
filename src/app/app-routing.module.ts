import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginRegisterComponent } from './componentes/login-register/login-register.component';
import { LoginActivateGuard } from './guard/login-activate.guard';

const routes: Routes = [
  {path: '' , component: HomeComponent, canActivate:[LoginActivateGuard]},
  {path: 'Login' , component: LoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
