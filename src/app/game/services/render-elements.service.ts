import { Injectable, Renderer2, RendererFactory2} from '@angular/core';

import { LogicService } from './logic.service';

@Injectable({
  providedIn: 'root'
})
export class RenderElementsService {

  constructor(private logicService: LogicService, 
                      rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private renderer: Renderer2;

  sqwereRender() {
    const margin1 = this.logicService.marginVert() + 'px';
    const margin2 = this.logicService.marginSide() + 'px';
    const margin = 'margin:' + margin1 + ' ' + margin2 + ';'  
    const square = this.renderer.createElement('div');

    square.setAttribute('class', 'square');
    square.setAttribute('style', 
      `height: 40px; 
       width: 40px; 
       ${margin} 
       position: absolute;
       background-color: aquamarine;`);

    return square;
  }

  resultRender() {
    const li = this.renderer.createElement('li');
    
    return li;
  }
}
