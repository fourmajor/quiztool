import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';


export class Question {
	id: number;
	question: string;
	answer: string;
  useranswer: string;
  quizid: number;
  quiz: Quiz; // include ref back to parent object, the Quiz

  wasCorrect(){

    //this.quiz.log('useranswer: ' + this.useranswer);
    //log('answer: ' + this.answer);

    if (this.useranswer == this.answer){
        return true;
    }
    return false;
    }

    /* type: text, multiple choice, multiple-choice only one answer, image, drop-down, etc. */
    /* Will we have subclasses? */
}

export class Quiz {
    // has the Quiz been evaluated and scored?
    wasEvaluated: boolean; // why not just set it here?
    questions: Question[]; // get the list of questions from statis data, or service/db, etc.
    selectedQuestion: Question; // not using this at the moment

    constructor() { 
        this.wasEvaluated = false;

        // these will eventualy come from db/service/etc. using static JSON data struct init didn't work
        // once i added a function to Question class - typescript sucks :)

        // init new array
        this.questions = [];

        var q = new Question();
        q.id = 1;
        q.question = "Should we build a great quiz tool?";
        q.answer = "yes";
        q.quizid = 1;
        q.quiz = this;
        this.questions.push(q); // will this blow up?

        q = new Question();
        q.id = 1;
        q.question = "What is shmooth\'s favorite player?";
        q.answer = "no";
        q.quizid = 1;
        q.quiz = this;
        this.questions.push(q);

    }
 


    /**
    * Score the quiz.
    */
    evaluate(){

        console.log('Evaluating from within Quiz object...');
        
        // for each question on the quiz, check if the provided answer is correct
        for (let question of this.questions) {
            console.log(question); // 1, "string", false
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
    title: String = 'Quiz Tool';
    quiz = new Quiz();
    testVar: String = "peter is cool";

    @ViewChild('focusThis') focusThis;
    
    //O to focus
    id:number=0

    constructor(){}

    newQuiz() {
        this.quiz = new Quiz();
        this.id=0
    }

    //wait for viewchild to update then focus
    ngAfterViewChecked(){
        if(this.id == 0){
            this.focusThis.nativeElement.focus();
            this.id++
        }
    }

    /**
    * Simple wrapper function to log stuff to the javascript console.
    */
    public log(message: String){
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

