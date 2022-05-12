import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-higherorlower',
  templateUrl: './higherorlower.component.html',
  styleUrls: ['./higherorlower.component.scss']
})
export class HigherorlowerComponent implements OnInit {
  cardAmount = 30;
  
  constructor() { }

  ngOnInit(): void {
    this.initCards();
  }

  initCards(){
    for (let i = 1; i < this.cardAmount; i++) {
      var randomRot = -43 + Math.ceil(Math.random() * 3);
      var card = document.querySelector(`.card:nth-child(${i})`) as HTMLElement | null;
      if(card){
          card.style.transform = `rotateX(60deg) rotateY(0deg) rotateZ(${randomRot}deg) translateZ(${i*3}px)`;
      }
    }
  }

  click(e:any){
    console.info(e);
    var test = e.target.classList;
    if(test.contains("down")){
      test.remove("down");
      test.remove("back");
      test.add("opened");
    }
    else if(test.contains("opened")){
      test.add("is-removed");
      // test.add("test");
      test.remove("opened");
    }
  }
}
