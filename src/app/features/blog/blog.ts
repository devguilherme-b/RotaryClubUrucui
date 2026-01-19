import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog {

}
