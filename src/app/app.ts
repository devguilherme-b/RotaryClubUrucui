import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd} from '@angular/router';
import { Header } from './layout/header/header';
import { Subheading } from './layout/subheading/subheading';
import { Footer } from './layout/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    Header,
    Subheading,
    RouterOutlet,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App{ 
  ishome = true;

  constructor (private router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        window.scrollTo(0,0);
      }
    });
  }

  ngOnInit(){
    this.router.events.pipe(filter(e=> e instanceof NavigationEnd
    )).subscribe(() => {
      this.ishome = this.router.url === '/';
    })
  }
}
