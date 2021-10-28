import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Book } from '../book-list/books.model';
@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.scss'],
})
export class BookCollectionComponent implements OnInit {
  @Input() books: any;
  @Output() remove = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
