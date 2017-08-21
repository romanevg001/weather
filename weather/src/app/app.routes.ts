import { Route, Routes } from '@angular/router';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'city'},
  { loadChildren: 'app/city/city.module#CityModule', path: 'city' }
];

