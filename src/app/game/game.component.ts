import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { TimerService } from './services/timer.service';
import { CounterService } from './services/counter.service';
//import { RenderElementsService } from './services/render-elements.service';
import { LogicService } from './services/logic.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('newGameBut', { static: false }) newGameBut!: ElementRef;
  @ViewChild('startGameBut', { static: false }) startGameBut!: ElementRef;
  @ViewChild('pauseGameBut', { static: false }) pauseGameBut!: ElementRef;
  @ViewChild('showScore', { static: false }) showScore!: ElementRef;
  @ViewChild('showTime', { static: false }) showTime!: ElementRef;
  @ViewChild('area', { static: false }) area!: ElementRef;
  @ViewChild('modal', { static: false }) modal!: ElementRef;

  constructor(private timerService: TimerService,
              private counterService: CounterService,
              //private renderService: RenderElementsService, 
              private logicService: LogicService) { }

  private gameTimeout: any;
  
  ngOnInit(): void {
    localStorage.setItem('time', JSON.stringify(60));
  }

  sqwereRender() {
    const margin1 = this.logicService.marginVert() + 'px';
    const margin2 = this.logicService.marginSide() + 'px';
    const margin = 'margin:' + margin1 + ' ' + margin2 + ';'
  
    const square = document.createElement('div');

    square.setAttribute('class', 'square');
    square.setAttribute('id', 'square');
    square.setAttribute('style', 
      `height: 40px; 
       width: 40px; 
       ${margin} 
       position: absolute;
       background-color: aquamarine;`);
    this.area.nativeElement.appendChild(square);
    console.log(square);
  }

  newGame() {
    const end = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    const newGameBut = this.newGameBut.nativeElement;
    const pauseGameBut = this.pauseGameBut.nativeElement;
    localStorage.setItem('time', JSON.stringify(60));

    for (let i = 0; i < end; i++) {
      this.sqwereRender();
    }

    this.timerService.timer(this.showTime.nativeElement);
    
    this.gameTimeoutFunc();
  }

  gameTimeoutFunc() {
    const localTime = localStorage.getItem('time');
    const gameTime = Number(localTime) * 1000;

    this.gameTimeout = setTimeout(() => {
      this.counterService.clearCounter();
      this.timerService.stopGame(); 
      this.timerService.clearTimer();
    }, gameTime);
  }

  startGame() {
    const startBut = this.startGameBut.nativeElement;
    const pauseBut = this.pauseGameBut.nativeElement;

    this.timerService.timer(this.showTime.nativeElement);
    this.gameTimeoutFunc();

    startBut.classList.add('hidden');
    pauseBut.classList.remove('hidden');
  }

  pauseGame() {
    const startBut = this.startGameBut.nativeElement;
    const pauseBut = this.pauseGameBut.nativeElement;

    this.timerService.stopGame();
    clearTimeout(this.gameTimeout);

    startBut.classList.remove('hidden');
    pauseBut.classList.add('hidden');
  }
}
