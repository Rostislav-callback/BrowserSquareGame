import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor() { }

  private point: number = 0;
  
  counter(dom: any) {
    ++this.point
    
    dom.innerHTML = this.point;
    localStorage.setItem('points', JSON.stringify(this.point));
  }

  clearCounter() {
    this.point = 0;
  }
}
