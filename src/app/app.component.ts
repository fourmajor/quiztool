import { Component } from '@angular/core';


export class Question {
	id: number;
	question: string;
	answer: string;
    useranswer: string;
    quizid: number;
    /* type: text, multiple choice, multiple-choice only one answer, image, drop-down, etc. */
    /* Will we have subclasses? */
}

const QUESTIONS: Question[] = [
  {id:1, question: 'Should we build a great quiz tool?', answer: 'Yes. This has been another edition of Simple Answers to Simple Questions. That was a pretty great question, methinks.', useranswer: '', quizid: 1}
  /* {id:2, question: 'What is shmooth\'s favorite player??', answer: 'Derek Fisher for some reason.', useranswer: ''}*/
  /*{id:3, question: 'What is fourmajor\'s favorite player?', answer: 'Obviously J Wall', useranswer: ''}*/
];

export class Quiz {
    // has the Quiz been evaluated and scored?
    wasEvaluated: boolean; // why not just set it here?

    questions: Question[]; // get the list of questions from statis data, or service/db, etc.

    selectedQuestion: Question;

    constructor() { 
        this.wasEvaluated = false;
        this.questions = QUESTIONS;
    }

}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    //template:`<h2>Hello, world</h2>` ,
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Quiz Tool';
    quiz = new Quiz();

    doAlert(){
    }
        
    onSelect(question: Question): void {
        this.quiz.selectedQuestion = question;
    }
}

