import { animate, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, Input, keyframes, Output, EventEmitter, Renderer } from '@angular/core';
import { state, style, transition, trigger, ViewChild } from '@angular/core';

import { Question, TranslateQuestion, Quiz } from './app.component';


@Component({
    selector: 'question-translate',
    templateUrl: './translate-question.component.html',
    styleUrls: ['./translate-question.component.css'],
	inputs: ['question']
})
export class TranslateQuestionComponent {

	@ViewChild('focusThis') focusThis;

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

    wasCorrect(){
        // RED_FLAG -- add null checks
        if (this.wasAnswered() &&
            (this.answer != 'undefined') && (this.answer) &&
            (this.useranswer != 'undefined') && (this.useranswer) &&
            (this.useranswer.toLowerCase() == this.answer.toLowerCase()) ){
            //console.log('the answer for this question was correct...');
            return true;
        }
        return false;
    }


    setAnswered(torf: boolean){
        this._wasAnswered = torf;
    }

    answered(){
        this._wasAnswered = true;
    }

    wasAnswered(){
        return this._wasAnswered;
    }

    // i kind of like this name better
    wasAnsweredCorrectly(){
        return this.wasCorrect();
    }

    ngAfterViewInit(){
            // this is a crazy hack b/c Angular sucks
            setTimeout(() => {
                if (this.focusThis) {
					//console.log('we have a focusThis element...');
					this.focusThis.nativeElement.focus();
				}
            }, 1);
    }

    // this is seemingly called every time the view is affected, including every keystroke, entering text, etc.
    ngAfterViewChecked(){
    }

	log(msg: string){
		console.log(msg);
	}
}

