import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginRegisterComponent } from './componentes/login-register/login-register.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'Login' , component: LoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
