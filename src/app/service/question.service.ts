import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  
  getQuestionfromJson(){
    return this.http.get<any>("assets/question.json");
  }
}
