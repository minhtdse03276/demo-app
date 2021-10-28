import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Book } from '../books.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Input() books: any;
  @Output() add = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
