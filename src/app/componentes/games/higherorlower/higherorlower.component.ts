import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-higherorlower',
  templateUrl: './higherorlower.component.html',
  styleUrls: ['./higherorlower.component.scss']
})
export class HigherorlowerComponent implements OnInit {
  suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  suitType = 0;
  cardAmount = 30;
  
  constructor() { }

  ngOnInit(): void {
    this.initCards();
  }


  randomize(){
    this.suitType = Math.floor(Math.random() * 4);
    let suitResult = this.suits[this.suitType];
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

  // $('.card').click(function(){
  //   if ($(this).hasClass('down')) {
  //     $(this).removeClass('down');
  //     $(this).addClass('opened');
  //   }
  //   else if ($(this).hasClass('opened')) {
  //     $(this).addClass('is-removed');
  //   }
  //   randomize();
  // });
}
