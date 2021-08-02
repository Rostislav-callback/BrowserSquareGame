import { Injectable} from '@angular/core';

import { LogicService } from './logic.service';

@Injectable({
  providedIn: 'root'
})
export class RenderElementsService {

  constructor(private logicService: LogicService) { }

}
