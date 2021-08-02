import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor() { }

  marginVert() {
    const min = 1;
    const max1 = 360;
    const marginVert = Math.floor(Math.random() * (max1 - min + 1) + min);

    return marginVert;
  }

  marginSide() {
    const min = 1;
    const max2 = 560;
    const marginSide = Math.floor(Math.random() * (max2 - min + 1) + min);

    return marginSide;
  }
}
