import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './componentes/about/about.component';
import { SnakeComponent } from './componentes/games/snake/snake.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginRegisterComponent } from './componentes/login-register/login-register.component';
import { LoginActivateGuard } from './guard/login-activate.guard';

const routes: Routes = [
  {path: '' , component: HomeComponent, canActivate:[LoginActivateGuard]},
  {path: 'Login' , component: LoginRegisterComponent},
  {path: 'Snake' , component: SnakeComponent, canActivate:[LoginActivateGuard]},
  {path: 'AboutMe' , component: AboutComponent, canActivate:[LoginActivateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
