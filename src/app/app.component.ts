import { Component } from '@angular/core';

export class Question {
	id: number;
	question: string;
	answer: string;
}

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
  }
}
