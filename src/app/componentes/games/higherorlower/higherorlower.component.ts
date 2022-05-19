import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResultsInterface } from 'src/app/models/interface/results-interface';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-higherorlower',
  templateUrl: './higherorlower.component.html',
  styleUrls: ['./higherorlower.component.scss']
})
export class HigherorlowerComponent implements OnInit {
  @ViewChild('deck')
  deck!:ElementRef;

  cardAmount = 30;
  indice:number = 0;
  respuestasCorrectas:number = 0;
  currentCard:String = "";
  text:String = " Press card to start. . . ";
  start:boolean = false;
  currentElementCard:number = 9;
  results!:ResultsInterface;
  listResults!:ResultsInterface[];
  
  constructor(private afs:GameService, private auth:AuthService) { }

  ngOnInit(): void {
    this.afs.getGameResult("HoL").subscribe(x => {
      this.listResults = x as ResultsInterface[];
    });
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

  higherOrLower(hOrL:String){
    let e = this.deck.nativeElement.childNodes[this.currentElementCard];
    this.start = false;
    this.click(e, hOrL);
    this.start = true;
  }

  click(e:any, hOrL:String = ""){
    let classListOfCard = e.classList;
    if(classListOfCard.contains("down") && !this.start){
      let random = Math.round(Math.random() * 12);
      if(hOrL != ""){
        let cardNum = parseInt(this.currentCard.toString());
        if((cardNum < random && hOrL == "H") || (cardNum > random && hOrL == "L")){
          this.respuestasCorrectas++;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Good Job',
            showConfirmButton: false,
            allowOutsideClick:false,
            timer: 1000
          });
        }
        else{
          if(this.respuestasCorrectas > 0){
            this.results = {
              id: Guid.create().toString(),
              game: "HoL",
              score: this.respuestasCorrectas.toString(),
              user: this.auth.user.displayName
            }

            this.afs.setObj("results", this.results).then(x =>{
              
            });
          }
          this.respuestasCorrectas = 0;
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Upsss',
            showConfirmButton: false,
            allowOutsideClick:false,
            timer: 1000
          });
        }
      }
      this.text = "Current card: ";
      this.currentCard = random.toString();
      e.style.backgroundImage = `url('../../../../assets/imagenes/carta${random}.png')`
      e.style.zIndex = this.indice;
      random = random == 0 ? 1 : random;
      classListOfCard.remove("down");
      classListOfCard.remove("back");
      classListOfCard.add("front");
      classListOfCard.add("opened");
      this.start = true;
    }
    else if(classListOfCard.contains("opened") && hOrL == ""){
      this.indice++;
      this.currentElementCard--;
      classListOfCard.add("is-removed");
      classListOfCard.remove("opened");
      if(this.currentElementCard == -1){
        setTimeout(() => {
          this.reiniciar();
        }, 50);  
      }
    }
  }

  reiniciar(){
    this.indice = 0;
    this.start = false;
    this.text = "Press card to start. . .";
    if(this.respuestasCorrectas > 0 ){
      this.text = "Cotinue...";
      this.currentCard = "";
    }
    this.respuestasCorrectas = 0;
    this.currentElementCard = 9;
    for (let index = 0; index <= this.currentElementCard; index++) {
      let element = this.deck.nativeElement.childNodes[index];
      element.classList.remove("is-removed");
      element.classList.add("down");
      element.classList.add("back");
      element.style.zIndex = 0;
    }
  }
}
