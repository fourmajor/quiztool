import { Component } from '@angular/core';

export class Question {
	id: number;
	question: string;
    useranswer: string;
	answer: string;
    /* type: text, multiple choice, multiple-choice only one answer, image, drop-down, etc. */
    /* Will we have subclasses? */
}

const QUESTIONS: Question[] = [
  {id:1, question: 'Should we build a great quiz tool?', answer: 'Yes. This has been another edition of Simple Answers to Simple Questions. That was a pretty great question, methinks.', useranswer: ''},
  {id:2, question: 'What is shmooth\'s favorite player??', answer: 'Derek Fisher for some reason.', useranswer: ''},
  {id:3, question: 'What is fourmajor\'s favorite player?', answer: 'Obviously J Wall', useranswer: ''}
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

