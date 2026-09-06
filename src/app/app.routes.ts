import { Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home';
import { TermConditionComponent } from './feature/term-condition/term-condition';
import { VolunteersComponent } from './feature/volunteers/volunteers';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'terms',
    component: TermConditionComponent,
  },
  {
    path: 'volunteers',
    component: VolunteersComponent,
  },
];
