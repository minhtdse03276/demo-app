import { TestBed } from '@angular/core/testing';

import { MyDemoLibService } from './my-demo-lib.service';

describe('MyDemoLibService', () => {
  let service: MyDemoLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDemoLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
