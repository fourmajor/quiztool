import { animate, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, keyframes, Output, EventEmitter, Renderer, state, style, transition, trigger, ViewChild } from '@angular/core';

//import { IQuestion, Question, Quiz } from './app.component';
import { Question, MultipleChoiceQuestion, FillInTheBlankQuestion, Quiz } from './app.component';

@Component({
    selector: 'question-multiple-choice',
    templateUrl: './multiple-choice-question.component.html',
    styleUrls: ['./multiple-choice-question.component.css'],
	inputs: ['question']
})
export class MultipleChoiceQuestionComponent extends Question {


	// passing a question object to a question component is just beyond weird/stupid, but
	// it's what Angular seems to want.
	@Input() question:MultipleChoiceQuestion;

	//_selectedAnswerId:number;

	onInit(){
		console.log('question: ' + this.question);
	}

	constructor(){
		super();
		//console.log('ok i am in the MultipleChoiceQuestionComponent constructor....');
		//console.log('question: ' + this.question);
	}


	deselectTheOtherAnswers(event,baseClass,selectedClass){
    	var l = event.target.parentElement.getElementsByClassName(baseClass);
    	var count = l.length;
    	for( var i= 0 ;i < count; i++ ){
      		l[i].className = baseClass;
    	}
    	event.target.className = baseClass + ' ' + selectedClass;

		//console.log('question: ' + this.question.getAnswers()[1].title);
  	}

	// this func and one it uses is stupid but works for now
	//  among the probs...
	// this 'only' part should be deteremined by the qeustion type -- whether
	// this question type allows multiple selected answers, instead of being
	// determined in the template UI -- which is not the end of the world, but still.
	selectOnlyThisAnswer(event){
		this.question._selectedAnswerId = event.target.id;
		//console.log('the selected answer id is ' + this.question._selectedAnswerId);
		this.deselectTheOtherAnswers(event,'multiplechoiceanswer','answerselected');
	}

	focusOnFirstField: boolean = true;

    id: number;
    title: string;
    answer: string;
    useranswer: string;
    _wasAnswered: boolean = false;
    quizid: number;
    quiz: Quiz; // include ref back to parent object, the Quiz
    _focusSet: boolean = false;
    _type: string; // fillintheblank, multiplechoice, fillintheblankcontext, verbconjugation, etc.



	/*
    wasCorrect(){
		// just return the 'correct' boolean of the 'selected' answer (there should be only
		// one marked 'true'
		if (this.question.getAnswerWithId( this.question._selectedAnswerId ).correct === true){
			return true;
		}
		return false;
    }
	*/





    setAnswered(torf: boolean){
        this._wasAnswered = torf;
    }

    answered(){
        this._wasAnswered = true;
    }

    wasAnswered(){
        //console.log('from question.component: wasAnswered: ' + this._wasAnswered);
        return this._wasAnswered;
    }

    // i kind of like this name better
    wasAnsweredCorrectly(){
        return this.wasCorrect();
    }


	@ViewChild('focusThis') focusThis;


    ngAfterViewInit(){
            // this is a crazy hack b/c Angular sucks
            setTimeout(() => {
                if( this.focusThis) {
					//console.log('we have a focusThis element...');
					this.focusThis.nativeElement.focus();
				}
                //this.id++;
            }, 1);
    }

    // this is seemingly called every time the view is effected, including every keystroke, entering text, etc.
    ngAfterViewChecked(){

        //console.log('ngAfterViewChecked() is being called...');
        /*
		if(this.focusThis && (! this.question._focusSet) ) {
        //if(this.focusThis && (! this._focusSet) ) {
			this.focusThis.nativeElement.focus();
            setTimeout(() => {
				this.question._focusSet = true; // to make sure we don't do it again?
            }, 1);
			//console.log('we set the focus!');
		}
		else{
			//console.log('darn.');
		}
		*/

		/*
        if (this.focusOnFirstField==true){
            //console.log('we want to focus on the first field, so i\'m going to do that...');
            if(this.focusThis) this.focusThis.nativeElement.focus();
            this.focusOnFirstField=false;
        }
        else{
            //console.log('we do NOT want to focus on the first field, so I will not do that...');
        }
		*/
    }


	log(msg: string){
		console.log(msg);
	}
}

