import { Component } from '@angular/core';

export class Question {
	id: number;
	question: string;
    useranswer: string;
	answer: string;
}

const QUESTIONS: Question[] = [
  {id:1, question: 'Should we build a great quiz tool?', answer: 'Yes. This has been another edition of Simple Answers to Simple Questions. That was a pretty great question, methinks.'},
  {id:2, question: 'What is shmooth\'s favorite player??', answer: 'Derek Fisher for some reason.'},
  {id:3, question: 'What is fourmajor\'s favorite player?', answer: 'Obviously J Wall'}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Quiz Tool';
  selectedQuestion: Question;
  questions = QUESTIONS;
  onSelect(question: Question): void {
    this.selectedQuestion = question;
  }
}

