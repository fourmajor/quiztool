import { Component, Input, Output, EventEmitter } from '@angular/core';


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
  {id:1, question: 'Should we build a great quiz tool?', answer: 'Yes. Stu.', useranswer: '', quizid: 1},
  {id:2, question: 'What is shmooth\'s favorite player??', answer: 'Yes. Peter.', useranswer: '', quizid: 1}
  /*{id:3, question: 'What is fourmajor\'s favorite player?', answer: 'Obviously J Wall', useranswer: 'testua3'}*/
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
            if (question.useranswer == question.answer){
                console.log('Correct!');
            }
            else{
                console.log('Incorrect.');
                console.log('useranswer: ' + question.useranswer);
                console.log('answer: ' + question.answer);
            }
        }
        this.wasEvaluated=true;
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
    testVar: String = "peter is cool";

    /**
    * Evaluate (score) the quiz. 
    */
    evaluate(){
        this.log('Evaluating...');
        console.log('testVar is ' + this.testVar);
        this.quiz.evaluate();
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

