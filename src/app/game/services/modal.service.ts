import { Injectable } from '@angular/core';

import { RenderElementsService } from './render-elements.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private renderService: RenderElementsService) { }

  showResultInModal() {
    const userScore = localStorage.getItem('points');
    
    return userScore;
  }

  saveGame(dom: any) {
    const resultBase = [];
    const username = dom.value;
    const userScore = localStorage.getItem('points');
    const result = `${username} - ${userScore};`;

    if (localStorage.getItem('Users score') == null) {
      resultBase.push(result);
      localStorage.setItem('Users score', JSON.stringify(resultBase));
    } else {
      const resultScore = JSON.parse(String(localStorage.getItem('Users score')));
      resultScore.push(result);
      localStorage.setItem('Users score', JSON.stringify(resultScore));
    }
  }
}
