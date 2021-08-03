import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
   }

  private point: number = 0;
  
  counter() {
    ++this.point
    
    localStorage.setItem('points', JSON.stringify(this.point));
  }

  clearCounter() {
    this.point = 0;
  }
}
