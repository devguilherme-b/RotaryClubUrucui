import { Component} from '@angular/core';
import { ScrollTo, CopyToClipboard} from "../../utils"

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  scrollTo(id: string){
    ScrollTo(id);
  }
  copy(argument: any){
    CopyToClipboard(argument);
  }
}
