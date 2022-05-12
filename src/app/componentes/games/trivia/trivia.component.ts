import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { EnumCategory } from 'src/app/models/EnumCategory';
import { TriviaService } from 'src/app/services/trivia.service';
import { TriviaModel } from 'src/app/models/games/trivia';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent {
  jugo:boolean = false;
  respuestasCorrectas:number = 0;
  valor:any;
  @ViewChild('ruleta') ruleta!: ElementRef; 
  @ViewChild('audio') audio!: ElementRef; 

  constructor(private service:TriviaService){

  }

  girar(){
    if(!this.jugo){
      let rand = Math.random() * 7200;
      this.calcular(rand);
      this.jugo = true;
      this.audio.nativeElement.play();
    }

  }

  test(question:TriviaModel){
    let text = question.question.replace("&quot;", "'");
    text = text.replace("&#039;","'");
    Swal.fire({
      title: question.category,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#7066e0',
      reverseButtons: false,
      allowOutsideClick: false,
    }).then((result) => {
      if ((result.isConfirmed && question.correct_answer == "True") || 
      (result.dismiss === Swal.DismissReason.cancel && question.correct_answer == "False")) {
          Swal.fire(
            'Correct!',
            ':)',
            'success'
          );
          this.respuestasCorrectas++;
      } else{
          Swal.fire(
            'Incorrect!',
            ':(',
            'error'
          );
          if(this.respuestasCorrectas > 0){
            this.respuestasCorrectas = 0;
            //TODO subir a firebase
          }
      }
      this.jugo = false;
    });
  }

  

  getTrivia(tipoTrivia:number){
    this.service.GetPreguntas(tipoTrivia.toString()).subscribe(resp =>{
      let currentQuestion = resp.results[0] as TriviaModel
      this.test(currentQuestion);
    });
  }

  calcular(rand:number){
    this.valor = rand /360;
    this.valor = (this.valor - parseInt(this.valor.toString().split(".")[0])) * 360;

    console.log(this.valor);
    this.ruleta.nativeElement.style.transform = `rotate(${rand}deg)`;

    setTimeout(() => {
      if(this.valor > 334 || this.valor <= 26){
        this.getTrivia(EnumCategory.History);
      }
      else if(this.valor > 26 && this.valor <= 78){
        this.getTrivia(EnumCategory.Nat);
      }
      else if(this.valor > 78 && this.valor <= 130){
        this.getTrivia(EnumCategory.Geografia);
      }
      else if(this.valor > 130 && this.valor <= 182){
        this.getTrivia(EnumCategory.Comodin);
      }
      else if(this.valor > 182 && this.valor <= 234){
        this.getTrivia(EnumCategory.Entertainment);
      }
      else if(this.valor > 234 && this.valor <= 286){
        this.getTrivia(EnumCategory.Art);
      }
      else if(this.valor > 286 && this.valor <= 334){
        this.getTrivia(EnumCategory.Sports);
      }
    }, 5000);
  }
  

}
