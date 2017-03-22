import { 
	animate,
	ChangeDetectionStrategy, 
	ChangeDetectorRef, 
	Component, 
	Input, 
	keyframes,
	Output, 
	EventEmitter, 
	state,
	style,
	transition,
	trigger,
	ViewChild } from '@angular/core';


export class Question {
	id: number;
	question: string;
	answer: string;
  	useranswer: string;
	_wasAnswered: Boolean = false;
  	quizid: number;
  	quiz: Quiz; // include ref back to parent object, the Quiz

  	wasCorrect(){
    	if (this.wasAnswered() && (this.useranswer == this.answer) ){
			//console.log('the answer for this question was correct...');
        	return true;
    	}
    	return false;
    }

	setAnswered(torf:Boolean){
		this._wasAnswered = torf;
	}

	answered(){
		this._wasAnswered = true;
	}

	wasAnswered(){
		//console.log('wasAnswered: ' + this._wasAnswered);
		return this._wasAnswered;
	}

	// i kind of like this name better
	wasAnsweredCorrectly(){
		return this.wasCorrect();
	}
}


export class Quiz {
	start: number = 50;
    // has the Quiz been evaluated and scored?
    _wasEvaluated: boolean; // why not just set it here?
    isActive: boolean; // why not just set it here?
	_isHidden: boolean = false;
    questions: Question[]; // get the list of questions from statis data, or service/db, etc.
    currentQuestion: Question; 
	pass_percentage: number;
	score_percentage: number;
	passed: boolean; // did user pass the quiz?
	quiz_done_status_message: String;
	quiz_display_type: String;
	question_index: number; // which question are we currently showing? 0-indexed

	// doing this instead of using Enum b/c Typescript sucks
	ALL_QUESTIONS_AT_ONCE:  String = "All Questions At Once";
    ONE_QUESTION_AT_A_TIME: String = "One Question At A Time";

	hidden(){
		return this._isHidden;
	}

	hide(){
		//this._isHidden=true;
	}

   	currentQuestionWasAnswered(){
		return this.getCurrentQuestion().wasAnswered(); 
	}

   	currentQuestionWasNotAnswered(){
		return ! this.currentQuestionWasAnswered(); 
	}

	// Either check the answer or advance to the next question, depending
	//  on the state of the quiz.
	checkOrContinue(){
		var q: Question = this.getCurrentQuestion();
		if (this.weAreAtTheLastQuestion()){
			// we are in the question-not-answered-phase, then answer it
			q.setAnswered(true);
		} 
		else 
		{
			// move us onto the next question
			this.question_index++;
		}
	}


	// decide whether button should say 'Check (Answer)' or 'Continue (to next question)'
	// 'or quiz' based on whether there is another question, etc.
	getCheckOrContinue(){
		var q: Question = this.getCurrentQuestion();
		
		if (q.wasAnswered()){
			return 'Continue';
		}
		return 'Check';
	}

	wasEvaluated(){
		//console.log('quiz.wasEvaluated: ' + this._wasEvaluated);
		return this._wasEvaluated;
	}

	getQuestion(index: number = 0){
		return this.questions[this.question_index];
	}
	getCurrentQuestion(){
		return this.questions[this.question_index];
	}

	/**
    * What should the next action be? Provide another question, or score/evaluate the quiz?
	*/
	nextQuestion(){
		if (this.thereAreMoreQuestions()){
			return this.questions[++this.question_index];
		}
		// set question_index to 0 I guess? issue warning? do nothing?
		this.question_index = 0;
	}

	// are there more questions?
	thereAreMoreQuestions(){
		if (this.question_index < (this.questions.length - 1) ){
			return true;
		}
		return false;
	}

	thereAreNoMoreQuestions(){
		return ! this.thereAreMoreQuestions();
	}

	// are we at the last question?
	weAreAtTheLastQuestion(){
		if (this.question_index >= (this.questions.length - 1) ){
			return true;
		}
		return false;
	}

	evaluateThisQuestion(event){
		//this.getCurrentQuestion
		// if this is the last question
		//if (this.question_index>= (this.questions.length - 1) ){
		if (this.weAreAtTheLastQuestion()){
			console.log('this is the last question. now what?');
			// show the answer to this question
			
			// evaluate the entire quiz?
			this.evaluate();
		}
		else{
			console.log('this is not the last question yet...');
			// just show the answer to this question
			//this.nextQuestion();
		}
		
		if(event){ // event not here for clicks, apparently?
			event.stopPropagation(); // don't allow the 'eval'/enter event to be processed twice
									 // else the 'review' screen at end will be skipped
			console.log('I am preventing the default...');
			event.preventDefault(); // don't allow the 'eval'/enter event to be processed twice
		}
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

        this._wasEvaluated = false;

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

        q = new Question();
        q.id = 1;
        q.question = "Is this a fourth question?";
        q.answer = "yes";
        q.quizid = 1;
        q.quiz = this;
        this.questions.push(q);
    }
 
    /**
    * Score the quiz.
    */
    evaluate(){
		console.log('calling quiz.evaluate()...');
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
	
        this._wasEvaluated=true;
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
//	animations: [
//		trigger('visibility', [])],

//(@flyInOut.done)="animationDone($event)"


animations: [
  trigger('visibility', [
    state('expanded',  style({opacity: 1, transform: 'translateX(0%)'})),
    state('collapsed', style({opacity: 0, transform: 'translateX(0%)'})),
    transition('expanded  => collapsed', [ // this is all messed up; no idea how it works
      animate('.25s', style({
        opacity: 0.0,
        transform: 'translateX(100%)' // slide out to the right
      }))
    ]),
    /*transition('collapsed  => expanded', [ // this is all messed up; no idea how it works
      animate('2.5s', style({
        opacity: 0.5,
        transform: 'translateX(50%)' // slide out to the right
      }))
    ])
	*/
  ])
]


})
export class AppComponent {

	question_title:string;
  	stateExpression: string; // we should raname this; it controls transitions/animations


    title: String = 'Quiz Tool';
    quiz: Quiz;
	focusSet:boolean = false;
	focused:number = 0;
	start: number = 50;

 	constructor() {
		this.quiz = new Quiz();
		//this.stateExpression = 'collapsed';
		this.stateExpression = 'expanded';
  	}

	handleKeyboardEvents(event: KeyboardEvent) {
        if(event.keyCode==13){
			//console.log('we got an enter keydown...' + event.keyCode);
			this.submitForm(event);
			event.preventDefault();	
			event.stopPropagation(); // don't handle this event again in handleKeyboardEvents()
		}
	}


	/**
	* This gets called twice bc Angular sucks and the '.done' callback hook gets
	* called twice. Lame.
	*
	* It also gets called initially, during first layout, even when there is no transition
	* from state to state. We want it to start in the 'expanded' state, and it does, yet
	* the animation still happens, with this callback.
	*/
	questionAnimationDone(){
		//console.log('question animation done.');
		//if( this.quiz.thereAreNoMoreQuestions()){
		//	alert('ok, there are no more questions. now what?');
		//	return;
		//}

		// if the current question was not answered yet, it's prob
		//  b/c this is being called before the question is answered
		if ( ! this.quiz.getCurrentQuestion().wasAnswered() ){
			// so we kind of want to skip all this, sort of?
			this.question_title = this.quiz.getCurrentQuestion().question;
			this.focusThis.nativeElement.focus();
			return;
		}
		if (this.quiz.thereAreMoreQuestions()){
			this.question_title = this.quiz.nextQuestion().question;
		}
		this.stateExpression='expanded';
	}	

	submitForm(event){

		if(event) event.preventDefault();
		if(event) event.stopPropagation();

		if(this.quiz.isActive && this.quiz.currentQuestionWasAnswered() && 
			this.quiz.thereAreMoreQuestions()){

			this.stateExpression = 'collapsed';
			this.focusThis.nativeElement.focus();
		}
		else if (this.quiz.isActive && this.quiz.currentQuestionWasAnswered() && 
			this.quiz.thereAreNoMoreQuestions()){
			this.stateExpression = 'collapsed';
		}
		else if (this.quiz.isActive && this.quiz.currentQuestionWasNotAnswered()){
			// then why is this being called?
			console.log('setting question to \'answered\'...');
			this.quiz.getCurrentQuestion().setAnswered(true);
		}
		else if ( (!this.quiz.isActive)){
			// show the Score/Result screen
			console.log('showing the score/result screen...');
			this.stateExpression='collapsed';
		}
		else{
			// take us to the next quiz
			console.log('give us a new quiz...');
			this.newQuiz();
		}
	}


    @ViewChild('focusThis') focusThis;
    @ViewChild('continueButton') continueButton;
    @ViewChild('nextQuizButton') nextQuizButton;
    
    //O to focus
    id:number=0;


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

		//console.log('visibility:' + this.stateExpression);
		//console.log('activeElement: ' + this.focusThis.nativeElement.focus()); 
		this.focusThis.nativeElement.focus(); 

		if( (! this.focusSet) && (this.focused < 10) ){
				setTimeout(() => {
					this.focusThis.nativeElement.focus();
					this.focusSet = true;
					//this.stateExpression = 'expanded';
					//this.focused++;
					//this.id++;
				}, 100);
		}
		else{
			//console.log('focus is set...already.');
		}
			
	}

    ngAfterViewInit(){
		//console.log('ngAfterViewInit()...');
        if( (!this.quiz._wasEvaluated) ){
			// this is a crazy hack b/c Angular sucks
			setTimeout(() => {
            	this.focusThis.nativeElement.focus();
            	//this.id++;
    		}, 1);
        }
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
        
}

