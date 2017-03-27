import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FillInTheBlankQuestionComponent } from './fill-in-the-blank-question.component';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question.component';
import { FillInTheBlankQuestion } from './app.component';
import { MultipleChoiceQuestion } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
	FillInTheBlankQuestionComponent,
	MultipleChoiceQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}

