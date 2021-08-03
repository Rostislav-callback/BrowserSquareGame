import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer2, RendererFactory2 } from '@angular/core';

import { TimerService } from './services/timer.service';
import { CounterService } from './services/counter.service';
import { ModalService } from './services/modal.service';
import { RenderElementsService } from './services/render-elements.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {
  @ViewChild('newGameBut', { static: false }) newGameBut!: ElementRef;
  @ViewChild('startGameBut', { static: false }) startGameBut!: ElementRef;
  @ViewChild('pauseGameBut', { static: false }) pauseGameBut!: ElementRef;
  @ViewChild('showTime', { static: false }) showTime!: ElementRef;
  @ViewChild('showScore', { static: false }) showScore!: ElementRef;
  @ViewChild('area', { static: false }) area!: ElementRef;
  @ViewChild('modal', { static: false }) modal!: ElementRef;
  @ViewChild('score', { static: false }) score!: ElementRef;
  @ViewChild('username', { static: false }) username!: ElementRef;
  @ViewChild('resultTable', { static: false }) resultTable!: ElementRef;
  @ViewChild('pauseArea', { static: false }) pauseArea!: ElementRef;

  constructor(private timerService: TimerService,
              private counterService: CounterService,
              private modalService: ModalService,
              private renderService: RenderElementsService, 
              rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private gameTimeout: any;
  private renderer: Renderer2;
  
  ngOnInit(): void {
    localStorage.setItem('time', JSON.stringify(60));
    localStorage.setItem('points', JSON.stringify(0));  
  }

  ngAfterViewInit() {
    this.addToTable();
  }

  newGame() {
    const end = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    const newGameBut = this.newGameBut.nativeElement;
    const pauseGameBut = this.pauseGameBut.nativeElement;
    localStorage.setItem('time', JSON.stringify(60));

    newGameBut.setAttribute('disabled', '');
    pauseGameBut.removeAttribute('disabled', '');

    for (let i = 0; i < end; i++) {
      const square = this.renderService.sqwereRender();
      this.area.nativeElement.appendChild(square);
    }

    this.timerService.timer(this.showTime.nativeElement);   
    this.gameTimeoutFunc();
  }

  gameTimeoutFunc() {
    const localTime = localStorage.getItem('time');
    const gameTime = Number(localTime) * 1000;
    const newGameBut = this.newGameBut.nativeElement;
    const pauseGameBut = this.pauseGameBut.nativeElement;
    const area = this.area.nativeElement;
    const score = this.showScore.nativeElement;
    const time = this.showTime.nativeElement;

    this.gameTimeout = setTimeout(() => {
      newGameBut.removeAttribute('disabled', '');
      pauseGameBut.setAttribute('disabled', '');
      area.textContent = '';
      score.innerHTML = '0';
      time.innerHTML = '60';
      this.showModal();
      this.counterService.clearCounter();
      this.timerService.stopGame(); 
      this.timerService.clearTimer();
    }, gameTime);
  }

  addToTable() {
    const res = JSON.parse(String(localStorage.getItem('Users score')));
    const resultTable = this.resultTable.nativeElement;
     
    for(let i = 0; i < res.length; i++){
      const li = this.renderer.createElement('li');
      li.innerHTML = res[i];
      resultTable.appendChild(li);
    }
  }

  saveResult() { 
    const username = this.username.nativeElement;
    this.modalService.saveGame(username);

    const res = JSON.parse(String(localStorage.getItem('Users score')));
    const resultTable = this.resultTable.nativeElement;
     
    const li = this.renderer.createElement('li');
    li.innerHTML = res.pop();
    resultTable.appendChild(li);
  }

  showModal() {
    const getModal = this.modal.nativeElement;
    const score = this.modalService.showResultInModal();
    getModal.click()
    this.score.nativeElement.innerHTML = 'Your score!' + score;   
  }

  startGame() {
    this.timerService.timer(this.showTime.nativeElement);
    this.gameTimeoutFunc();
    this.pauseArea.nativeElement.classList.add('hidden');
    this.startGameBut.nativeElement.classList.add('hidden');
    this.pauseGameBut.nativeElement.classList.remove('hidden');
  }

  pauseGame() {
    this.timerService.stopGame();
    clearTimeout(this.gameTimeout);
    this.pauseArea.nativeElement.classList.remove('hidden');
    this.startGameBut.nativeElement.classList.remove('hidden');
    this.pauseGameBut.nativeElement.classList.add('hidden');
  }
}
