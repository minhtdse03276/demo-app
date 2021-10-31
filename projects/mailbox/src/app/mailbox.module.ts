import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { MAILBOX_ROUTES } from './app.routes';
import { MailboxHomeComponent } from './mailbox-home/mailbox-home.component';
import { reducer } from 'src/app/counter/counter.reducers';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [MailboxHomeComponent, CounterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MAILBOX_ROUTES),
    StoreModule.forFeature('count', reducer),
    FormsModule,
  ],
  providers: [],
})
export class MailboxModule {}
