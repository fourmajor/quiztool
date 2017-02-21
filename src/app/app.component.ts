import { Component } from '@angular/core';

export class Question {
	id: number;
	question: string;
	answer: string;
}

const QUESTIONS: Question[] = [
  {id:2, question: 'What is shmooth\'s favorite player?', answer: 'Derek Fisher for some reason.'},
  {id:3, question: 'What is fourmajor\'s favorite player?', answer: 'Obviously J Wall'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz tool2';
  question: Question = {
  	id: 1,
  	question: 'wh3at is the square root of two?',
  	answer: 'approximately 1.41'
  };
  questions = QUESTIONS;
}