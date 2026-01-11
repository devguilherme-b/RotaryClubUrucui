import { Component } from '@angular/core';
import { ScrollTo } from '../../utils';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  scrollTo(id: string){
    ScrollTo(id);
  }
}
