import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CityComponent } from './city.component';
import { routes } from './city.routes';
import { CityService } from './city.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CityComponent],
  providers:[CityService]
})
export class CityModule { }
