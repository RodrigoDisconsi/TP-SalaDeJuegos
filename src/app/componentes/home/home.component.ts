import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public mensaje:string = "";
  public logged:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  testing(){
    console.log("ASD");
  }

}
