import { NgModule } from '@angular/core';
import { MyDemoLibComponent } from './my-demo-lib.component';
import { CounterDemoComponent } from './counter-demo/counter-demo.component';



@NgModule({
  declarations: [MyDemoLibComponent, CounterDemoComponent],
  imports: [
  ],
  exports: [MyDemoLibComponent,CounterDemoComponent]
})
export class MyDemoLibModule { }
