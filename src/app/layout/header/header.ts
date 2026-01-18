import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollTo } from '../../utils';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  scrollTo(id: string){
    ScrollTo(id);
  }
}
