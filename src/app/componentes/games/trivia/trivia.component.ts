import { Component, ElementRef, ViewChild } from '@angular/core';
// import Swal from 'sweetthis.test2';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent {

  giros:number = 0;
  vueltas:number = 1;
  valor:any;
  @ViewChild('ruleta') ruleta!: ElementRef; 
  @ViewChild('audio') audio!: ElementRef; 

  girar(){
    if(this.giros < this.vueltas){
      let rand = Math.random() * 7200;
      this.calcular(rand);
      this.giros++;
      this.audio.nativeElement.play();
    }

  }

  test(tipo:String){
    // Swal.fire({
    //   title: tipo,
    //   width: 600,
    //   padding: '3em',
    //   color: '#716add',
    //   background: '#fff url(/images/trees.png)',
    //   showClass: {
    //     popup: 'animate__animated animate__fadeInDown'
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__fadeOutUp'
    //   }
    // })
    alert(tipo);
    
  }

  calcular(rand:number){
    this.valor = rand /360;
    this.valor = (this.valor - parseInt(this.valor.toString().split(".")[0])) * 360;

    console.log(this.valor);
    this.ruleta.nativeElement.style.transform = `rotate(${rand}deg)`;

    setTimeout(() => {
      if(this.valor > 334 || this.valor <= 26){
        this.test("Historia");
      }
      else if(this.valor > 26 && this.valor <= 78){
        this.test("Química");
      }
      else if(this.valor > 78 && this.valor <= 130){
        this.test("Geografía");
      }
      else if(this.valor > 130 && this.valor <= 182){
        this.test("Comodín");
      }
      else if(this.valor > 182 && this.valor <= 234){
        this.test("Entretenimiento");
      }
      else if(this.valor > 234 && this.valor <= 286){
        this.test("Arte");
      }
      else if(this.valor > 286 && this.valor <= 334){
        this.test("Deporte");
      }
    }, 5000);
  }
  

}
