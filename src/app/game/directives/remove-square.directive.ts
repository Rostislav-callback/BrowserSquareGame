import { Directive, HostListener, ElementRef, ViewChild, Renderer2, RendererFactory2} from '@angular/core';

import { CounterService } from '../services/counter.service'
import { RenderElementsService } from '../services/render-elements.service';

@Directive({
  selector: '[removesquare]'
})
export class RemoveSquareDirective {
  constructor(private el: ElementRef,
              private counterService: CounterService,
              private renderService: RenderElementsService,
              rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private renderer: Renderer2;

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    const end = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    const area = this.el.nativeElement;
    const getParent = this.renderer.parentNode(area);
    const grandParent = this.renderer.parentNode(getParent).childNodes;
    const elem = event.target;

    if (area.contains(event.target)) {     
      this.counterService.counter();
      const getPoints = localStorage.getItem('points');

      const element = () => {
        for (let item of grandParent) {
          if (item.classList.contains('show_points')) {
            const childItems = item.childNodes;
            return childItems[1];
          }
        }
      }

      for (let i = 0; i < end; i++) {
        const square = this.renderService.sqwereRender();
        area.appendChild(square);
      }

      const elemNode = element();

      area.removeChild(elem); 
      elemNode.innerHTML = getPoints;
    }
  } 
}
