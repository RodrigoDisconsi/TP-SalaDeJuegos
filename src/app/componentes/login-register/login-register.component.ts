import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  click:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

   
  onClick(){
    this.click = !this.click;
  }

}
