export class TriviaModel {

    category: string;
    question: string;
    correct_answer: string;


    constructor(category: string, type: string, difficulty: string, question: string, correct_answer: string, incorrect_answers: Array<any>) {
        this.category = category;
        this.question = question;
        this.correct_answer = correct_answer;
    }
}