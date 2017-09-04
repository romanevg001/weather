import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule,JsonpModule } from '@angular/http';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, rootReducer, INIT_STATE } from './services/store';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ShareService } from './services/share.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        // enableTracing: true 
      }
    ),

    NgReduxModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer, INIT_STATE)
  }
}
