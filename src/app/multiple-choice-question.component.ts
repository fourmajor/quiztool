import { animate, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, keyframes, Output, EventEmitter, Renderer, state, style, transition, trigger, ViewChild } from '@angular/core';

//import { IQuestion, Question, Quiz } from './app.component';
import { Question, FillInTheBlankQuestion, Quiz } from './app.component';


@Component({
    selector: 'question-multiple-choice',
    templateUrl: './multiple-choice-question.component.html',
    styleUrls: ['./multiple-choice-question.component.css'],
	inputs: ['question']
})
//export class MultipleChoiceQuestionComponent implements IQuestion {
export class MultipleChoiceQuestionComponent extends Question {

	focusOnFirstField:boolean = true;

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
                if(this.focusThis) {
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


	log(msg:string){
		console.log(msg);
	}
}

