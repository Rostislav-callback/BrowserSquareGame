import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  private int: any;
  private time: number = 60;

  timer(dom: any) {     
    this.int = setInterval(() => {
      this.time = this.time - 1;

      dom.innerHTML = this.time;
      localStorage.setItem('time', JSON.stringify(this.time));    
    }, 1000);   
  }

  stopGame() {
    clearInterval(this.int);
  }

  clearTimer() {
    this.time = 60;
  }
}
