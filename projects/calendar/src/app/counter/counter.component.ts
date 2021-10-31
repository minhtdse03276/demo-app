import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.interfaces';
import { decrement, increment, incrementByAmount } from './counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
  ngOnInit(): void {}
  incrementAmount = 0;
  count$!: Observable<number>;
  decrement() {
    this.store.dispatch(decrement());
  }
  increment() {
    this.store.dispatch(increment());
  }
  incrementByAmount() {
    this.store.dispatch(incrementByAmount({ amount: +this.incrementAmount }));
  }
}
