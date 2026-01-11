import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ScrollTo } from '../../utils';

@Component({
  selector: 'app-partners',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './partners.html',
  styleUrl: './partners.css'
})
export class Partners {
  scrollTo(id: string){
    ScrollTo(id);
  }
}
