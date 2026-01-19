import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  scrollTo(id: string):void{
    const element = document.getElementById(id);

    if(element){
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
