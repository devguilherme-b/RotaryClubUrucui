import { Component } from '@angular/core';
import { ScrollTo } from '../../utils';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-subheading',
  imports: [RouterLink],
  templateUrl: './subheading.html',
  styleUrl: './subheading.css'
})
export class Subheading {
  scrollTo(id: string){
      ScrollTo(id);
  }
}
