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

	wasAnswered(){
		if(this.useranswer){
			return false;
		}
		return true;
	}

	// i kind of like this name better
	wasAnsweredCorrectly(){
		return this.wasCorrect();
	}
}


export class Quiz {
	start: number = 50;
    // has the Quiz been evaluated and scored?
    wasEvaluated: boolean; // why not just set it here?
    isActive: boolean; // why not just set it here?
    questions: Question[]; // get the list of questions from statis data, or service/db, etc.
    selectedQuestion: Question; // not using this at the moment
	pass_percentage: number;
	score_percentage: number;
	passed: boolean; // did user pass the quiz?
	quiz_done_status_message: String;
	quiz_display_type: String;
	question_index: number; // which question are we currently showing? 0-indexed

	// doing this instead of using Enum b/c Typescript sucks
	ALL_QUESTIONS_AT_ONCE:  String = "All Questions At Once";
    ONE_QUESTION_AT_A_TIME: String = "One Question At A Time";

	getQuestion(index: number = 0){
		return this.questions[this.question_index];
	}
	getCurrentQuestion(){
		return this.questions[this.question_index];
	}

	getNextQuestion(){
		console.log("question_index: " + this.question_index);
		console.log("question: " + this.questions[this.question_index].question);
		console.log("\n\n");
		//Question q = this.questions[++this.question_index];
		//return q;
		return "";
		//return this.questions[++this.question_index];
	}

	/**
    * What should the next action be? Provide another question, or score/evaluate the quiz?
	*/
	nextQuestion(){
		return this.questions[++this.question_index];
	}

	evaluateThisQuestion(event){
		//alert('sup');
			//event.stopPropagation(); // don't allow the 'eval'/enter event to be processed twice
		if (this.question_index>= (this.questions.length - 1) ){
			//console.log('out of questions! evaluating quiz now.');
			this.evaluate();
		}
		else{
			this.nextQuestion();
			//console.log('We are evaluating this question...' + event);
			//event.stopPropagation();
		}
		
		if(event){ // event not here for clicks, apparently?
			event.stopPropagation(); // don't allow the 'eval'/enter event to be processed twice
									 // else the 'review' screen at end will be skipped
			console.log('I am preventing the default...');
			event.preventDefault(); // don't allow the 'eval'/enter event to be processed twice
		}
		//return false;
	}

	/**
     * Grab the next question, I guess.
	 */
	next(){
		if (this.question_index>= (this.questions.length - 1) ){
			console.log('out of questions! evaluating quiz now.');
			this.evaluate();
			this.isActive = false; // mark the quiz as 'not running'
		} else {
			console.log('here...');
			this.getCurrentQuestion().useranswer='';
			console.log('...'+this.getCurrentQuestion().useranswer+'...');
			this.question_index = this.question_index + 1;
			//console.log('...'+this.getCurrentQuestion().useranswer+'...');
			this.getCurrentQuestion().useranswer='';
		}
	}

	userPassed(){
		if (this.score_percentage >= this.pass_percentage) {
			return true;
		}
		return false;
	}

    constructor() { 
		this.question_index = 0;
		this.quiz_display_type = this.ONE_QUESTION_AT_A_TIME;
		//this.quiz_display_type = this.ALL_QUESTIONS_AT_ONCE;

		this.isActive = true; // this we should prob do somewhere else...when first question is displayed...

		this.pass_percentage = 90; // % required to pass a quiz
		this.score_percentage = 0; // use did not score anything yet, but we default to 0

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
        q.question = "Does Donald Trump suck?";
        q.answer = "yes";
        q.quizid = 1;
        q.quiz = this;
        this.questions.push(q);

        q = new Question();
        q.id = 1;
        q.question = "Is this a third question?";
        q.answer = "yes";
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
		var num_right: number = 0;
		var num_wrong: number = 0;
        for (let question of this.questions) {
            //console.log(question); // 1, "string", false
			if ( question.wasAnsweredCorrectly() ){ 
				++num_right; 
			} else {
				++num_wrong; 
			}
        }
	    var total_number_of_questions = this.questions.length;
		//console.log('num questions: ' + total_number_of_questions);
		this.score_percentage = Math.floor( (num_right/total_number_of_questions)*100 );
		//console.log('score_percentage: ' + this.score_percentage);
	
		if (this.userPassed()){
			this.quiz_done_status_message = "Great job -- you passed!";
		}
		else if (num_right > 0){
			this.quiz_done_status_message = "Well, you got at least one right. :) Try again!";
		} else {
			this.quiz_done_status_message = "That's ok -- plenty more where that came from.";
		}
	
        this.wasEvaluated=true;
		this.isActive=false;
    }
}

@Component({

	host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    },

    selector: 'app-root',
    templateUrl: './app.component.html',
    //template:`<h2>Hello, world</h2>` ,
    styleUrls: ['./app.component.css'],
	//changeDetection: ChangeDetectionStrategy.OnPush, // not sure if still needed; see setTimeout() hack
})
export class AppComponent {

    title: String = 'Quiz Tool';
    quiz: Quiz;
	focusSet:boolean = false;
	focused:number = 0;
	start: number = 50;

	handleKeyboardEvents(event: KeyboardEvent) {
        if(event.keyCode==13){
			console.log('we got an enter keydown...' + event.keyCode);

			if(this.quiz.isActive){
				// then why is this being called?
				console.log('the current quiz is active');
			}
			else{
				console.log('the current quiz is not active');
        		//this.quiz.evaluateThisQuestion(event);
				this.newQuiz();
			}

			//event.stopPropagation(); // don't allow the 'eval'/enter event to be processed twice

			//return false;
			// RED_FLAG: we need a way to know if this quiz was _just_ evaluated, or if it's at some other stage now.
			// shiiiiiiiiit
			//this.focusSet=false;

			//if(this.quiz.wasEvaluated && (this.quiz.isActive) ){
				//this.newQuiz();
			//	return false;
			//}
		}

		//alert('here');
    }


    @ViewChild('focusThis') focusThis;
    @ViewChild('continueButton') continueButton;
    @ViewChild('nextQuizButton') nextQuizButton;
    
    //O to focus
    id:number=0;

 	constructor() {
		this.quiz = new Quiz();
  	}

    newQuiz() {
        this.quiz = new Quiz();
		this.quiz.isActive = true;
		this.focusSet = false;
		this.focused = 0;
        this.id=0
    }



    // this is seemingly called every time the view is effected, including every keystroke, entering text, etc.
    ngAfterViewChecked(){

		//console.log('ngAfterViewChecked() is being called...');

		//console.log('value of focused is ' + this.focused);

		if( (! this.focusSet) && (this.focused < 10) ){
				setTimeout(() => {
					this.focusThis.nativeElement.focus();
					this.focusSet = true;
					this.focused++;
					//this.id++;
				}, 1);
		}
		else{
			//console.log('focus is set...already.');
		}
			
	}

    ngAfterViewInit(){
		console.log('ngAfterViewInit()...');
        //if( (!this.quiz.wasEvaluated) && (this.id == 0) ){
        if( (!this.quiz.wasEvaluated) ){
			// this is a crazy hack b/c Angular sucks
			setTimeout(() => {
            	this.focusThis.nativeElement.focus();
            	//this.id++;
    		}, 1);
        }

		/*
		if (this.quiz.wasEvaluated && (this.quiz.quiz_display_type == this.quiz.ONE_QUESTION_AT_A_TIME) ){
			// this is a crazy hack b/c Angular sucks
			setTimeout(() => {
				console.log('here...');
				//this.nextQuizButton.nativeElement.focus(); // then focus us on the 'Continue' button
    		}, 10);
		}
		*/
		
		/*
		if (this.quiz.wasEvaluated){
			// this is a crazy hack b/c Angular sucks
			setTimeout(() => {
				console.log('focusing on continueButton...');
				this.continueButton.nativeElement.focus(); // then focus us on the 'Continue' button
    		}, 1000);
		}
		*/
	
    }

    /**
    * Simple wrapper function to log stuff to the javascript console.
    */
    public log(message: String){
        console.log( message ); // black
    }

    alert(message: String){
        alert(message);
    }
        
    onSelect(question: Question): void {
        this.quiz.selectedQuestion = question;
    }
}

