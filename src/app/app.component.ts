import { Component, OnInit } from '@angular/core';
import { ShareService } from './services/share.service';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, rootReducer } from './services/store';
import {Actions} from './services/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoaderShow: boolean = false;
  @select() counter;
  @select('counter') count;
  @select(['members','countMembers']) countMembers;
  @select((s:IAppState)=> s.members.countMembers) countMembers2;

  constructor(
      private _shareService: ShareService,
      private ngRedux: NgRedux<IAppState>
  ){
    
  }

  ngOnInit(){
    this._shareService.loaderHandler$.subscribe((meaning)=>{
        if(meaning == 'show') { this.isLoaderShow = true }else{ this.isLoaderShow = false}
    })
  }

  addDiggit(){
    this.ngRedux.dispatch({type: Actions.INCREMENT })
  }

}
