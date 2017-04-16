import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

 constructor(private http: Http) { }

    // Get all posts from the API
    getAllQuestions() {
        console.log('i am in getAllQuestions()...slow version...');
        return this.http.get('/api/questions')
            .map(res => res.json());
    }

    getAllWords() {
        
         return this.http.get('/api/words')
            .map(res => res.json());
       

        /*
        var vm = this;

        this.http.get('/api/words').then( function( response ) {
            vm.words = response; 
        });
        */

        /*
        console.log('i am in getAllWords()...');
        let jsonString = '{"english":"build","spanish":"construir"}';
        let jsonObj = JSON.parse( jsonString ); // returns a JSON object
        return jsonObj;
        */
    }

    getAllQuestionsFast() {
        var jsonQuestions = {
                "questions": [{
                    "id": 0,
                    "title": "Conjugate this verb in the ",
                    "answer": "quiz",
                    "quizid": 0,
                    "type"  : "VerbConjugation",
                    "tense" : "Past"
                }, {
                    "id": 1,
                    "title": "Does Donald Trump suck?",
                    "answer": "yes",
                    "quizid": 0,
                    "type"  : "MultipleChoice"
                }, {
                    "id": 2,
                    "title": "Is this a third question?",
                    "answer": "yes",
                    "quizid": 0,
                    "type"  : "FillInTheBlank"
                }, {
                    "id": 3,
                    "title": "Conjugate this verb in the ",
                    "answer": "quiz",
                    "quizid": 0,
                    "type"  : "VerbConjugation",
                    "tense" : "Present"
                }]
            };
        return jsonQuestions;
    }

}
