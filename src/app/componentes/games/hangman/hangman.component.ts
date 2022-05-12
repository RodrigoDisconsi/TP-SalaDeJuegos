import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {

  animar:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  click(e:any){
    console.info(e);
    var test = e.target.classList;
    test.add("is-animated");
  }
}
