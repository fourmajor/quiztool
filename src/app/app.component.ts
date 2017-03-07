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
  {id:1, question: 'Should we build a great quiz tool?', answer: 'Yes.', useranswer: '', quizid: 1}
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

    /**
    * Score the quiz.
    */
    evaluate(){
        console.log('Evaluating from within Quiz object...');
        
        // for each question on the quiz, check if the provided answer is correct
        for (let question of this.questions) {
            //if (QuestionAnsweredCorrectly()){
            //}
            console.log(question); // 1, "string", false
        }

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

    /**
    * Evaluate (score) the quiz. 
    */
    evaluate(){
        this.log('Evaluating...');
        this.quiz.evaluate();
        this.quiz.wasEvaluated=true;
    }

    /**
    * Simple wrapper function to log stuff to the javascript console.
    */
    log(message: String){
        console.log( message ); // black
        /*
        console.debug('debug: test log, yo...'); // blue
        console.warn('warn: test log, yo...'); // yellow
        console.info('info: test log, yo...'); // black (with 'i' icon indicator)
        console.error('error: test log, yo...'); // red
        */
    }

    alert(message: String){
        alert(message);
    }
        
    onSelect(question: Question): void {
        this.quiz.selectedQuestion = question;
    }
}

