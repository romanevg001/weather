import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareService {

  constructor() { }

  private loaderHandlerSource = new Subject<string>();

  loaderHandler$ = this.loaderHandlerSource.asObservable();
  

  loaderHandler(meaning) {
    this.loaderHandlerSource.next(meaning);
  }

}