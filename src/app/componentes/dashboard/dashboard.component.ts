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
  isLoggedIn$: Observable<boolean>;                  // {1}

  constructor(private authService: AuthService) { 
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  // ngOnInit() {
  //    // {2}
  // }

//  checkSidenav(sidenav:any){
//    if(sidenav._animationState == "open"){
//      sidenav.toggle();
//    }
//  }

 onLogout(){
  this.authService.logout().then(()=>{
    this.authService.loggedIn.next(false);
  });
 }
}
