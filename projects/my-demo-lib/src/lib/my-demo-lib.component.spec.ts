import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDemoLibComponent } from './my-demo-lib.component';

describe('MyDemoLibComponent', () => {
  let component: MyDemoLibComponent;
  let fixture: ComponentFixture<MyDemoLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDemoLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDemoLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
