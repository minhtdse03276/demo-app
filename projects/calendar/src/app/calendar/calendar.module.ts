import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../counter/counter.reducers';
import { CalendarComponent } from './calendar.component';
import { CALENDAR_ROUTES } from './calendar.routes';


@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CALENDAR_ROUTES),
    StoreModule.forFeature('remotecounter', reducer),
  ],
  providers: [],
})
export class CalendarModule { }

