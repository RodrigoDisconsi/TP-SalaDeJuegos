import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ResultsInterface } from 'src/app/models/interface/results-interface';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';
import { HangmanService } from 'src/app/services/hangman.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {

  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  restartGameBtnShown = false;
  result!:ResultsInterface;
  constructor(
    private hangmanService: HangmanService,
    private afs:GameService,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe((response) => {
      this.questions = response.items;
      this.category = response.category;
      this.pickNewQuestion();
    });
  }

  guess(letter: string) {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  dummyClick() {
    const key = prompt('Enter a key') || '';
    this.guess(key);
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtnShown = false;
  }

  pickNewQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[randomIndex];
    console.log(this.question);
  }

  onGameFinished(event:number) {
    if(event > 0){
      this.result = {
        id: Guid.create().toString(),
        game: "Hangman",
        score: event.toString(),
        user: this.auth.user.displayName
      };

      this.afs.setObj("results", this.result).then(x =>{
              
      });
    }
    this.restartGameBtnShown = true;
  }
}
