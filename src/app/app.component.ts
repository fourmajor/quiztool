import { animate, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, Input, keyframes, OnInit, Output, EventEmitter }   from '@angular/core';
import { Renderer, state, style, transition, trigger, ViewChild } from '@angular/core'; 

import {  FillInTheBlankQuestionComponent } from './fill-in-the-blank-question.component'; 
import {  MultipleChoiceQuestionComponent } from './multiple-choice-question.component'; 
import {  VerbConjugationQuestionComponent } from './verb-conjugation-question.component'; 
import {  TranslateQuestionComponent } from './translate-question.component'; 

import { DataService } from './data.service';

export abstract class Question {

    title: string;
	setAnswered(torf:boolean){
		this._wasAnswered = torf;
	}

    _useranswer: string;
	_wasAnswered: boolean;

	wasAnswered():boolean {
		return this._wasAnswered;		
	}
	wasAnsweredCorrectly(): boolean{
		return this._wasAnswered;
	}
	wasCorrect(): boolean{
		return this._wasAnswered;
	}
}


export class VerbConjugationQuestion extends Question {

	// all the possible verb tenses (only 5 important ones for now)
	// RED_FLAG -> would prefer an object like TENSE.PRESENT, TENSE.PAST, TENSE.PRESENT_PROGRESSIVE, etc.
	static readonly TENSE_PRESENT: 				string = "Present";
	static readonly TENSE_PAST: 				string = "Past";
	static readonly TENSE_PRESENT_PROGRESSIVE: 	string = "Present Progressive";
	static readonly TENSE_PAST_PROGRESSIVE: 	string = "Past Progressive";
	static readonly TENSE_FUTURE: 				string = "Future";

	answerVerbType():string{
		if (this._verb_type === 'regular')
			return 'a regular';
		return 'an irregular';
	}

	constructor(){
		super();
	}

	id: number;
	title: string;
	answer: string;
  	useranswer: string;
	_wasAnswered: boolean = false;
  	quizid: number;
  	quiz: Quiz; // include ref back to parent object, the Quiz
	_focusSet:boolean = false;
	_type:string; // fillintheblank, multiplechoice, fillintheblankcontext, verbconjugation, etc.

	_verb:string;
	_verb_english:string;
	_verb_meaning:string;
	_verb_type:string; // 'regular' or 'irregular'
	_verb_tense:string; // present, past, present progressive, past progressive, future


	// the five uses (we are not doing vosotros for now)
	_answer_yo:string;
	_answer_tu:string;
	_answer_el_ella_usted:string;
	_answer_vosotros:string;
	_answer_nosotros:string;
	_answer_ellos_ellas_ustedes:string;

	// the five user-supplied answers (bound using ngFor two-way binding)
	_useranswer_yo:string;
	_useranswer_tu:string;
	_useranswer_el_ella_usted:string;
	_useranswer_vosotros:string;
	_useranswer_nosotros:string;
	_useranswer_ellos_ellas_ustedes:string;


	wasCorrectYo(){
		return (this._useranswer_yo === this._answer_yo);
	}
	wasCorrectTu(){
		return (this._useranswer_tu === this._answer_tu);
	}
	wasCorrectElEllaUsted(){
		return (this._useranswer_el_ella_usted === this._answer_el_ella_usted);
	}
	wasCorrectNosotros(){
		return (this._useranswer_nosotros === this._answer_nosotros);
	}
	wasCorrectEllosEllasUstedes(){
		return (this._useranswer_ellos_ellas_ustedes === this._answer_ellos_ellas_ustedes);
	}

	hideTooltextForThisParticularConjugation(pronoun:string){
		// if question is not even answered, then def hide the tooltext (correction)
		if ( ! this._wasAnswered ) return true;

		if(pronoun==='yo') 
			return this.wasCorrectYo();
		if(pronoun==='tu') 
			return this.wasCorrectTu();
		if(pronoun==='el_ella_usted') 
			return this.wasCorrectElEllaUsted();
		if(pronoun==='nosotros') 
			return this.wasCorrectNosotros();
		if(pronoun==='ellos_ellas_ustedes') 
			return this.wasCorrectEllosEllasUstedes();

		return true; // always hide by default
	}

  	wasCorrect(){
		// prereq
		if (! this.wasAnswered() ){ return false; }
		return 	this.wasCorrectYo() &&
			this.wasCorrectTu() &&
			this.wasCorrectElEllaUsted() &&
			this.wasCorrectNosotros() &&
			this.wasCorrectEllosEllasUstedes();
    }


	setAnswered(torf:boolean){
		this._wasAnswered = torf;
	}

	answered(){
		this._wasAnswered = false;
	}

	wasAnswered(){
		//console.log('wasAnswered: ' + this._wasAnswered);
		return this._wasAnswered;
	}

	wasNotAnswered(){
		//console.log('wasAnswered: ' + this._wasAnswered);
		return ! this._wasAnswered;
	}

	// i kind of like this name better
	wasAnsweredCorrectly(){
		return this.wasAnswered() && this.wasCorrect();
	}

	wasAnsweredIncorrectly():boolean{
		console.log('wasAnswered(): ' + this.wasAnswered());
		console.log('wasIncorrect():' + ! this.wasCorrect());
		//console.log('result: ' + this.wasAnswered() && (! this.wasCorrect()));
		console.log('result: ' + (false && true));
		//return this.wasAnswered() && (! this.wasCorrect());
		//return (false && true);
		return false;
	}

	getAnswer():string{
		return 'This is ' + this.answerVerbType() + ' verb. It ends with \'-ar\' so can be conjugated' +
			   ' with the normal verb endings.';
		//return this._answer_details;
	}

}

export class FillInTheBlankQuestion extends Question {

	constructor(){
		super();
		//console.log('FillInTheBlankQuestion constructor...do we have to call super()?');
	}

	id: number;
	title: string;
	answer: string;
  	useranswer: string;
	_wasAnswered: boolean = false;
  	quizid: number;
  	quiz: Quiz; // include ref back to parent object, the Quiz
	_focusSet:boolean = false;
	_type:string; // fillintheblank, multiplechoice, fillintheblankcontext, verbconjugation, etc.

  	wasCorrect(){
		// RED_FLAG -- add null checks
    	if (this.wasAnswered() && 
			(this.answer!='undefined') && (this.answer) &&
			(this.useranswer!='undefined') && (this.useranswer) &&
			(this.useranswer.toLowerCase() == this.answer.toLowerCase()) ){
			//console.log('the answer for this question was correct...');
        	return true;
    	}
    	return false;
    }

	setAnswered(torf:boolean){
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

export class TranslateQuestion extends Question {

	constructor(){
		super();
	}

	id: number;
	title: string;
    text: string;
	answer: string;
  	useranswer: string;
	_wasAnswered: boolean = false;
  	quizid: number;
  	quiz: Quiz; // include ref back to parent object, the Quiz
	_focusSet:boolean = false;
	_type:string; // fillintheblank, multiplechoice, fillintheblankcontext, verbconjugation, etc.

  	wasCorrect(){
		// RED_FLAG -- add null checks
    	if (this.wasAnswered() && 
			(this.answer!='undefined') && (this.answer) &&
			(this.useranswer!='undefined') && (this.useranswer) &&
			(this.useranswer.toLowerCase() == this.answer.toLowerCase()) ){
			//console.log('the answer for this question was correct...');
        	return true;
    	}
    	return false;
    }

	setAnswered(torf:boolean){
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

export class MultipleChoiceQuestionAnswer {
	id: string; // just an id for HTML and other uses
	title: string; // the text of the answer itself
	correct: boolean; // whether or not this is the correct answer to the question
}

export class MultipleChoiceQuestion extends Question {

	_selectedAnswerId:number = null;

    wasCorrect(){
		//if( (this._selectedAnswerId!='undefined') && (this._selectedAnswerId) ){
		if( this._selectedAnswerId!=null ){
			// just return the 'correct' boolean of the 'selected' answer (there should be only
			// one marked 'true'
			if (this.getAnswerWithId( this._selectedAnswerId ).correct === true){
				//console.log('we got this MultipleChoice question correct!');
				return true;
			}
		}
        return false;
    }

	constructor(){
		super();
	}

	_answers: MultipleChoiceQuestionAnswer[]; // all the possible answers to this question

	// DATA MEMBERS
    id: number;
    title: string;
    answer: string;
    useranswer: string;
    _wasAnswered: boolean;
    quizid: number;
    quiz: Quiz; // include ref back to parent object, the Quiz
    _focusSet:boolean;
    _type:string; // fillintheblank, multiplechoice, fillintheblankcontext, verbconjugation, etc.

	// FUNCTIONS
	wasAnswered(){
		return this._wasAnswered;
	}

	wasAnsweredCorrectly(){
		return this.wasCorrect();
	}
	setAnswered(torf:boolean){
		this._wasAnswered = torf;
	}

	getAnswerWithId(arg_id){
		for (let answer of this._answers) {
			//console.log('answer.id: ' + answer.id);
			if ( answer.id === arg_id ){
				return answer;
			}
		}
		return null; // return last answer if none found matching...?
	}

	getAnswers(){
		return this._answers;
	}

	getPossibleAnswers(){
		return this._answers;
	}
	
}

export class Quiz {
	start: number = 50;
    // has the Quiz been evaluated and scored?
    _wasEvaluated: boolean; // why not just set it here?
    isActive: boolean; // why not just set it here?
	_isHidden: boolean = false;
    questions: Question[] = [];
    currentQuestion: Question; 
	pass_percentage: number;
	score_percentage: number;
	passed: boolean; // did user pass the quiz?
	quiz_done_status_message: String;
	quiz_display_type: String;
	question_index: number; // which question are we currently showing? 0-indexed
	num_right: number = 0;
	num_wrong: number = 0;
	results_message_header: string;
	results_message_details: string;
	
    words: any = [];

	// doing this instead of using Enum b/c Typescript sucks
	ALL_QUESTIONS_AT_ONCE:  String = "All Questions At Once";
    ONE_QUESTION_AT_A_TIME: String = "One Question At A Time";

	hidden(){
		return this._isHidden;
	}

	hide(){
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
			//console.log('this is the last question. now what?');
			// show the answer to this question
			
			// evaluate the entire quiz?
			this.evaluate();
		}
		else{
			//console.log('this is not the last question yet...');
			// just show the answer to this question
			//this.nextQuestion();
		}
		
		if(event){ // event not here for clicks, apparently?
			event.stopPropagation(); // don't allow the 'eval'/enter event to be processed twice
									 // else the 'review' screen at end will be skipped
			//console.log('I am preventing the default...');
			event.preventDefault(); // don't allow the 'eval'/enter event to be processed twice
		}
	}


	/**
     * Grab the next question, I guess.
	 */
	next(){
		if (this.question_index>= (this.questions.length - 1) ){
			//console.log('out of questions! evaluating quiz now.');
			this.evaluate();
			this.isActive = false; // mark the quiz as 'not running'
		} else {
			//console.log('here...');
			this.getCurrentQuestion()._useranswer='';
			//console.log('...'+this.getCurrentQuestion().useranswer+'...');
			this.question_index = this.question_index + 1;
			//console.log('...'+this.getCurrentQuestion().useranswer+'...');
			this.getCurrentQuestion()._useranswer='';
		}
	}

	userPassed(){
		if (this.score_percentage >= this.pass_percentage) {
			return true;
		}
		return false;
	}

    /**
    * Since this is not in an angular compoent, it will not be called with this DataService
    * provider automatically -- we have to pass it in explicitly.
    */
    //constructor() { 
    constructor(private dataService: DataService) { 

        //console.log('Quiz constructor()....');

		this.question_index = 0;
		this.quiz_display_type = this.ONE_QUESTION_AT_A_TIME;
		//this.quiz_display_type = this.ALL_QUESTIONS_AT_ONCE;
		this.isActive = true; // this we should prob do somewhere else...when first question is displayed...
		this.pass_percentage = 90; // % required to pass a quiz
		this.score_percentage = 0; // use did not score anything yet, but we default to 0
        this._wasEvaluated = false;
        // these will eventualy come from db/service/etc. using static JSON data struct init didn't work
        // once i added a function to Question class - typescript sucks :)

        /*
        console.log('about to get all words...');
        this.words = this.dataService.getAllWords();
        // this.dataService.getAllWords().subscribe(
             // words => { this.words = words; }
        // );
        console.log('got all words...' + this.words.english);
        if (this.words.length>0){
            console.log('we got words! ' + this.words.length);
        }
        else{
            console.log('no words yet...');
        }
        */

        // this is returning an observable, so...no idea
		//var jsonQuestions =	this.dataService.getAllQuestions(this.questions);
		//var jsonQuestions =	this.dataService.getAllQuestions().subscribe(
		//this.dataService.getAllWords();

        
		//var jsonQuestions =	this.dataService.getAllWords().subscribe(
		this.words = this.dataService.getAllWords().subscribe(
            res=>{
                // do something with the response data now 
                //console.log('got our results...now about to create questions...');
                //console.log(res);
                //console.log(res.constructor.name);
                for (let word of res) {
                    //console.log(word); // 1, "string", false
                    this.createTranslateQuestion(word);
                }
                this.words = res; 
                //this.jsonQuestions = this.createQuestionObjects( res );
                // call something that takes 'res' and populates 'questions'
            }
        );
    }


    /*
    * Pass a json object with requisite properties.
    */
    createTranslateQuestion(json){
        let q = new TranslateQuestion(); 

        q.id = 1; //jsonQ.id;
        q.title = 'Translate this text'; //jsonQ.title;
        //q.title = json.spanish;
        q.text = json.spanish;
        q.answer = json.english; // jsonQ.answer;
        q.quizid = 1; //jsonQ.quizid;
        q._type = 'Translate'; //jsonQ.type;

        this.questions.push(q); // will this blow up?
    }

 
    /*
    * Pass a json object with requisite properties.
    */
    createFillInTheBlankQuestion(json){
        let q = new FillInTheBlankQuestion(); 

        q.id = 1; //jsonQ.id;
        q.title = 'What is the meaning of this word?'; //jsonQ.title;
        q.answer = 'test answer'; // jsonQ.answer;
        q.quizid = 1; //jsonQ.quizid;
        q._type = 'FillInTheBlank'; //jsonQ.type;

        this.questions.push(q); // will this blow up?
    }

    createQuestionObjects( jsonQuestions ){

        //console.log(jsonQuestions);

        // pull info from db and populate our objects/questions
		for (let jsonQ of jsonQuestions.questions) {

			let q = null;

			//console.log(jsonQ.type); // 1, "string", false
			if (jsonQ.type==='VerbConjugation'){
				q = this.createNewVerbConjugationQuestion(jsonQ);
			}
			else if (jsonQ.type==='FillInTheBlank'){
				//var q = <IQuestion> new FillInTheBlankQuestionComponent(); 
				q = new FillInTheBlankQuestion(); 
				q.id = jsonQ.id;
				q.title = jsonQ.title;
				q.answer = jsonQ.answer;
				q.quizid = jsonQ.quizid;
				q._type = jsonQ.type;
			}
			else if (jsonQ.type==='MultipleChoice'){
				//var q = <IQuestion> new MultipleChoiceQuestionComponent(); 
				q = new MultipleChoiceQuestion(); 
				// now, create 3 answers and assign them to the _answers array
				var answer1 = new MultipleChoiceQuestionAnswer();
				answer1.id = "0";
				answer1.title = "Yeah.";
				answer1.correct = false;
				var answer2 = new MultipleChoiceQuestionAnswer();
				answer2.id = "1";
				answer2.title = "Definitely.";
				answer2.correct = true;
				var answer3 = new MultipleChoiceQuestionAnswer();
				answer3.id = "2";
				answer3.title = "Yep Yep Yep!";
				answer3.correct = false;
				q._answers = [answer1, answer2, answer3];

				q.id = jsonQ.id;
				q.title = jsonQ.title;
				q.answer = jsonQ.answer;
				q.quizid = jsonQ.quizid;
				q._type = jsonQ.type;
			}
			else{
				console.log('ERROR: The question type is not a known type: ' + jsonQ.type);
				q = this.createNewVerbConjugationQuestion(jsonQ);
			}

			// add the question to our Quiz's 'questions' array
            console.log('about to add question...');
			this.questions.push(q); // will this blow up?
		}

    } 



	createNewVerbConjugationQuestion(jsonQuestion){

		let jsonQ = jsonQuestion;

		let q = new VerbConjugationQuestion(); 

		q.id = jsonQ.id;
		q.answer = jsonQ.answer;
		q.quizid = jsonQ.quizid;
		q._type = jsonQ.type;

		q._verb = 'tomar';
		q._verb_english = 'to take; to drink';
		q._verb_type = 'regular';


		// the five uses (we are not doing vosotros for now)
		if (jsonQ.tense === 'Present'){
			//console.log('I am present...');
			q._answer_yo = 'tomo';
			q._answer_tu = 'tomas';
			q._answer_el_ella_usted = 'toma';
			q._answer_nosotros = 'tomamos';
			q._answer_vosotros = 'tomais';
			q._answer_ellos_ellas_ustedes = 'toman';
			q._verb_tense = VerbConjugationQuestion.TENSE_PRESENT; // this needs to be runtime value in db/etc.
		}
		else if (jsonQ.tense === 'Past' ) {
			//console.log('I am past...');
			q._answer_yo = 'tome';
			q._answer_tu = 'tomaste';
			q._answer_el_ella_usted = 'tomo';
			q._answer_nosotros = 'tomamos';
			q._answer_vosotros = '';
			q._answer_ellos_ellas_ustedes = 'tomaron';
			q._verb_tense = VerbConjugationQuestion.TENSE_PAST; // this needs to be runtime value in db/etc.
		}
		else {
			console.log('We got an invalid tense type: ' + jsonQ._tense);
		}
		// RED_FLAG: I think I'm doing something wrong here w/ this verb tense...runtime value is hard to set.
		q.title = 'Conjugate this verb in the ' + q._verb_tense + ' tense:';
		return q;

	}

	numberOfQuestions(){
		if(this.questions){
	    	return this.questions.length;
		}
		return 0;
	}


    /**
    * Score the quiz.
    */
    evaluate(){
		//console.log('calling quiz.evaluate()...');
        //console.log('Evaluating from within Quiz object...');
        // for each question on the quiz, check if the provided answer is correct
		this.num_right = 0;
		this.num_wrong = 0;
        for (let question of this.questions) {
            //console.log(question); // 1, "string", false
			if ( question.wasAnsweredCorrectly() ){ 
				++this.num_right; 
			} else {
				++this.num_wrong; 
			}
        }
	    var total_number_of_questions = this.questions.length;
		//console.log('num questions: ' + total_number_of_questions);
		this.score_percentage = Math.floor( (this.num_right/total_number_of_questions)*100 );
		//console.log('score_percentage: ' + this.score_percentage);
	
		if (this.userPassed()){
			//this.quiz_done_status_message = "Great job -- you passed!";
			this.results_message_details = "Great job -- you passed!";
		}
		else if (this.num_right > 0){
			this.results_message_details = "Well, you got at least one right. :) Try again!";
		} else {
			this.results_message_details = "That's ok -- plenty more where that came from.";
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
  ])
]
})
export class AppComponent implements OnInit {

    @ViewChild('focusThis') focusThis;
    @ViewChild('continueButton') continueButton;
    @ViewChild('nextQuizButton') nextQuizButton;

	question_title:string;
  	stateExpression: string; // we should raname this; it controls transitions/animations

    words: any = []; // putting this everywhere

    ngOnInit() {
        // Retrieve words from the API
        //console.log('in ngOnInit()....');
    }

	focusOnFirstField: boolean = true;

    title: String = 'Quiz Tool';
    quiz: Quiz;
	_focusSet:boolean = false;
	focused:number = 0;
	start: number = 50;

    constructor(private dataService: DataService) { 

		this.quiz = new Quiz( dataService );
        this.dataService = dataService;
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


   	questionAnimationStart(){
        if(this.focusThis){
            //console.log('we have a focusThis element...');
        }
        else{
            //console.log('we do not have a focusThis element...');
        }

		if(this.focusThis && (! this._focusSet) ) {
			//console.log('there is a focusThis element...');
			this.focusThis.nativeElement.focus();
			this._focusSet = true;
		} else {
			//console.log('there is no focusThis element...');
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

		//console.log('in Done()...');

		this.focusOnFirstField=true;

		if( this.quiz.thereAreNoMoreQuestions()){
			//console.log('ok, there are no more questions. now what?');
			return;
		}

		if(this.focusThis) {
			//console.log('there is a focusThis element...');
			this.focusThis.nativeElement.focus();
		} else {
			//console.log('there is no focusThis element...');
		}

		if(this.focusThis) { 
			//console.log('there is a focusThis element...');
			this.focusThis.nativeElement.autofocus=true;
		} else { 
			//console.log('there is no focusThis element...');
		}

		// if the current question was not answered yet, it's prob
		//  b/c this is being called before the question is answered
		if ( ! this.quiz.getCurrentQuestion().wasAnswered() ){
			// so we kind of want to skip all this, sort of?
			this.question_title = this.quiz.getCurrentQuestion().title;
			if (this.focusThis) this.focusThis.nativeElement.focus();
			return;
		}
		if (this.quiz.thereAreMoreQuestions()){
			this.question_title = this.quiz.nextQuestion().title;
		}
		this.stateExpression='expanded';
	}	


	submitForm(event){

		if(event) event.preventDefault();
		if(event) event.stopPropagation();

		if(this.quiz.isActive 
			&& this.quiz.currentQuestionWasAnswered() 
			&& this.quiz.thereAreMoreQuestions()){

			//console.log('there are more questions...');
			this.stateExpression = 'collapsed';
			if(this.focusThis) {
				//console.log('in submitForm() there is a focusThis element...');
				this.focusThis.nativeElement.focus();
			}
			else {
				//console.log('in submitForm() there is no focusThis element...');
			}
		}
		else if (this.quiz.isActive && 
				this.quiz.currentQuestionWasAnswered() && 
				this.quiz.thereAreNoMoreQuestions()){

			//console.log('there are no more questions...');
			this.stateExpression = 'collapsed';

			//console.log('show the overview screen...');
			this.quiz.evaluate();
		}	
		else if (this.quiz.isActive && this.quiz.currentQuestionWasNotAnswered()){
			// then why is this being called?
			//console.log('setting question to \'answered\'...');
			this.quiz.getCurrentQuestion().setAnswered(true);
		}
		else{
			// take us to the next quiz
			//console.log('creating a new quiz...');
			//this.newQuiz();
			this.quiz = new Quiz( this.dataService );
			this.stateExpression = 'expanded';
		}
	}


    
    //O to focus
    id:number=0;


    newQuiz() {
        this.quiz = new Quiz( this.dataService );
		this.quiz.isActive = true;
		this._focusSet = false;
		this.focused = 0;
        this.id=0
    }



    // this is seemingly called every time the view is effected, including every keystroke, entering text, etc.
    ngAfterViewChecked(){

		//console.log('ngAfterViewChecked() is being called...');

		if (this.focusOnFirstField==true){
			//console.log('we want to focus on the first field, so i\'m going to do that...');
			if(this.focusThis) this.focusThis.nativeElement.focus();
			this.focusOnFirstField=false;
		}
		else{
			//console.log('we do NOT want to focus on the first field, so I will not do that...');
		}
	}

    ngAfterViewInit(){
		//console.log('ngAfterViewInit()...');
        if( (!this.quiz._wasEvaluated) ){
			// this is a crazy hack b/c Angular sucks
			setTimeout(() => {
            	if(this.focusThis) this.focusThis.nativeElement.focus();
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

