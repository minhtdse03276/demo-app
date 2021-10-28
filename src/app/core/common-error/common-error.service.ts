import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonErrorService {

  public messageSubject: BehaviorSubject<any>;

  constructor() {
    this.messageSubject = new BehaviorSubject<any>(false);
  }

  public getMessage(mess: string): void {
    this.messageSubject.next(mess);
  }
}
