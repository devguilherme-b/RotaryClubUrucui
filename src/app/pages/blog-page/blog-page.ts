import { Component } from '@angular/core';
import { News } from '../../features/news/news';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  imports: [News, RouterModule],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.css'
})
export class BlogPage {
  
}
