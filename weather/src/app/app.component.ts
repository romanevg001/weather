import { Component, OnInit } from '@angular/core';
import { ShareService } from './services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoaderShow: boolean = false;

  constructor(
      private _shareService: ShareService
  ){
    
  }

  ngOnInit(){
    this._shareService.loaderHandler$.subscribe((meaning)=>{
        if(meaning == 'show') { this.isLoaderShow = true }else{ this.isLoaderShow = false}
    })
  }

}
