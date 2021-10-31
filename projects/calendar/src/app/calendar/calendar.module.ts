import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { CALENDAR_ROUTES } from './calendar.routes';
import { CounterComponent } from '../counter/counter.component';
import { FormsModule } from '@angular/forms';
import { reducer } from 'src/app/counter/counter.reducers';
import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [CalendarComponent, CounterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CALENDAR_ROUTES),
    FormsModule,
    StoreModule.forFeature('count', reducer),
  ],
  providers: [],
})
export class CalendarModule {}
