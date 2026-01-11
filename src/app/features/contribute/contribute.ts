import { Component } from '@angular/core';
import { CopyToClipboard } from '../../utils';

@Component({
  selector: 'app-contribute',
  imports: [],
  templateUrl: './contribute.html',
  styleUrl: './contribute.css'
})
export class Contribute {
  copy(argument: any){
    CopyToClipboard(argument);
  }
}
