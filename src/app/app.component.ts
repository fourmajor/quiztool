import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';


export class Question {
	id: number;
	question: string;
	answer: string;
  	useranswer: string;
  	quizid: number;
  	quiz: Quiz; // include ref back to parent object, the Quiz

  	wasCorrect(){
    	if (this.useranswer == this.answer){
        	return true;
    	}
    	return false;
    }
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
        //console.log('Evaluating from within Quiz object...');
        // for each question on the quiz, check if the provided answer is correct
        for (let question of this.questions) {
            //console.log(question); // 1, "string", false
        }
        this.wasEvaluated=true;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    //template:`<h2>Hello, world</h2>` ,
    styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title: String = 'Quiz Tool';
	//cdr: ChangeDetectorRef;
    quiz = new Quiz();

    @ViewChild('focusThis') focusThis;
    @ViewChild('continueButton') continueButton;
    
    //O to focus
    id:number=0

 	//constructor(cdr: ChangeDetectorRef) {
 	constructor() {
    	//this.cdr = cdr;
  	}

    newQuiz() {
        this.quiz = new Quiz();
        this.id=0
    }

    //wait for viewchild to update then focus
    ngAfterViewChecked(){
    	//this.cdr.detectChanges();
        if( (!this.quiz.wasEvaluated) && (this.id == 0) ){
			// this is a crazy hack b/c Angular sucks
			setTimeout(() => {
            	this.focusThis.nativeElement.focus();
            	this.id++;
    		}, 1);
        }
		if (this.quiz.wasEvaluated){
			// this is a crazy hack b/c Angular sucks
			setTimeout(() => {
				this.continueButton.nativeElement.focus(); // then focus us on the 'Continue' button
    		}, 1);
			//console.log(this.continueButton);
		}
    	//this.cdr.detectChanges();
		//console.log('document.activeElement.id: ' + document.activeElement.id);
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

