import { Injectable } from '@angular/core';

import { interval, Subject, NEVER } from 'rxjs';
import { tap, startWith, switchMap, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  //private int: any;
  public timerSubject$: Subject<{pause?: boolean, timerValue?: number}> = new Subject()

  timer(dom: any) {
    this.timerSubject$.pipe(
      startWith({pause: true, timerValue: 60}),
      scan((val, acc) => ({...val, ...acc})),
      tap((data) => {
        dom.innerHTML = data.timerValue;
      }),
      switchMap((data) => data.pause ? NEVER : interval(1000).pipe(
        tap(val => {
          //@ts-ignore: Object is possibly 'null'. 
          data.timerValue -= 1;
          localStorage.setItem('time', JSON.stringify(data.timerValue))
          dom.innerHTML = data.timerValue;
        }),
      ))
    ).subscribe();
  }

  stopTimer() {
    this.timerSubject$.next({pause: true});
  }

  startTimer() {
    this.timerSubject$.next({pause: false});
  }

  clearTimer() {
    this.timerSubject$.next({pause: true, timerValue: 60});
  }
  

  /**timer(dom: any) {     
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
  }**/
}

