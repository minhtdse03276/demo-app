import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { StoreModule } from '@ngrx/store';
import { booksReducer } from './state/books.reducer';
import { collectionReducer } from './state/collection.reducer';
import { BookListComponent } from './book-list/book-list/book-list.component';
import { BookCollectionComponent } from './book-collection/book-collection.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CounterComponent } from './counter/counter.component';
import { StoreModule } from '@ngrx/store';
import * as counterReducer from './counter/counter.reducers';
import { FormsModule } from '@angular/forms';
// import * as counterReducer from '/states/counter/counter.reducers';

@NgModule({
  declarations: [AppComponent, BookListComponent, BookCollectionComponent, CounterComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    // StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
    HttpClientModule,
    CoreModule,
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(
      { counter: counterReducer.reducer },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
