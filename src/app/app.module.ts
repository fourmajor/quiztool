import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { appRouting } from './app.routing';
import { HttpModule } from '@angular/http';

import { PostsService } from './posts.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { NotFoundComponent } from './not-found.component';

import { FillInTheBlankQuestionComponent } from './fill-in-the-blank-question.component';
import { MultipleChoiceQuestionComponent } from './multiple-choice-question.component';
import { VerbConjugationQuestionComponent } from './verb-conjugation-question.component';

import { FillInTheBlankQuestion } from './app.component';
import { MultipleChoiceQuestion } from './app.component';
import { VerbConjugationQuestion } from './app.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
	FillInTheBlankQuestionComponent,
	MultipleChoiceQuestionComponent,
	VerbConjugationQuestionComponent,
	PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    appRouting,
    HttpModule
  ],
  providers: [PostsService], // Add the posts service
  bootstrap: [AppComponent]
})
export class AppModule { 
}

