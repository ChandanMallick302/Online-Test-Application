import { Directive,Input,ElementRef,Renderer2,HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect:Boolean =false;
  constructor(private er:ElementRef,private render:Renderer2) { }
  @HostListener('click') answer()
  {
    if(this.isCorrect)
    {
      this.render.setStyle(this.er.nativeElement,'background','green');
      this.render.setStyle(this.er.nativeElement,'color','white');
      this.render.setStyle(this.er.nativeElement,'border','2px solid grey');
    }
    else{
      this.render.setStyle(this.er.nativeElement,'background','Red');
      this.render.setStyle(this.er.nativeElement,'color','#fff');
      this.render.setStyle(this.er.nativeElement,'border','2px solid grey')
    }
  }
}
