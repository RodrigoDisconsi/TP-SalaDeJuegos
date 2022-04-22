import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;

  constructor(private authService: AuthService) { 
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.username$ = this.authService.username;
  }

 onLogout(){
  this.authService.logout().then(()=>{
    this.authService.loggedIn.next(false);
    this.sidenav.toggle();
  });
 }
}
