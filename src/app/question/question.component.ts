import { Component, OnInit, QueryList } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter: number = 60;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  public intervals: any;
  public progress: any = 0;
  isQuizCompleted:boolean=false;


  constructor(private questionService: QuestionService) {}
  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
     this.getAllQuestion();
     this.startCounter();
   }
  getAllQuestion() {
    this.questionService.getQuestionfromJson().subscribe((res) => {
      console.log(res.questions);
      this.questionList = res.questions;
    });
  }

  nextQuestion() { 
        this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno:number,option:any)
  {
    if(currentQno===this.questionList.length)
    {
      this.isQuizCompleted=true;
      this.stopCounter();
    }
    if(option.correct)
    {
      this.points+=10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },1000)
    }
    else{
      setTimeout(()=>{
        this.currentQuestion++;
      this.inCorrectAnswer++;
      this.resetCounter();
      this.getProgressPercent();
      },1000) 
      this.points-10;
    }
  }
  startCounter()
  {
    this.intervals=interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0)
      {
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
        this.getProgressPercent();
      }
    });
    setTimeout(()=>{
      this.intervals.unsubscribe();
    },60000)
  }
  stopCounter()
  {
    this.intervals.unsubscribe();
    this.counter=0;
  }
  resetCounter()
  {
    this.stopCounter();
    this.counter=60;
    this.startCounter();
    this.progress=0;
  }

  resetQuiz()
  {
    this.resetCounter();
    this.getAllQuestion();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
  }
  getProgressPercent()
  {
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
