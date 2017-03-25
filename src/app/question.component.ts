import { animate, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, keyframes, Output, EventEmitter, Renderer, state, style, transition, trigger, ViewChild } from '@angular/core';


@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],
	inputs: ['question']
})
export class QuestionComponent {

	focusOnFirstField:boolean = true;

	@Input() question;

	//focusIsSet: boolean = false;
	_focusSet:boolean = false;

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

