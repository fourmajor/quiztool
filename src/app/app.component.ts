import { Component } from '@angular/core';

export class Question {
	id: number;
	question: string;
	answer: string;
}

const QUESTIONS: Question[] = [
<<<<<<< HEAD
  {id:1, question: 'What is the purpose of this quiz?', answer: 'The Wizards are good-ish all of a sudden.'},
  {id:2, question: 'What is shmooth\'s favorite player?', answer: 'Derek Fisher for some reason.'},
=======
  {id:1, question: 'Should we build a great quiz tool?', answer: 'Yes. This has been another edition of Simple Answers to Simple Questions.'},
  {id:2, question: 'What is shmooth\'s favorite player??', answer: 'Derek Fisher for some reason.'},
>>>>>>> 1ad79d3c318c71a0cbd9d189b1e50edb24a6033f
  {id:3, question: 'What is fourmajor\'s favorite player?', answer: 'Obviously J Wall'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'quiz tool2';
  selectedQuestion: Question;
  questions = QUESTIONS;
  onSelect(question: Question): void {
    this.selectedQuestion = question;
  }
}

