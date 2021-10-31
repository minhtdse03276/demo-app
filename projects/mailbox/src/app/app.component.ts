import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/core/common-service/common-service.service';

@Component({
  selector: 'mb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mailbox';
  id: any;
  constructor(private commonService: CommonServiceService){
    this.id = this.commonService.getClientMessageId()
    // console.log();
  }
}
