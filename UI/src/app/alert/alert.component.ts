import {Component,  OnInit, ViewChild} from '@angular/core';
import {ALERT_TYPE, AlertService} from "../shared/alert.service";
import {ALERT_TYPES} from "../shared/AlertTypes";

declare var $: any;
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @ViewChild('modalContainer') modalContainer;
  currType: ALERT_TYPE;
  mBody: string;
  mHeader: string;

  constructor(private as: AlertService) {}

  ngOnInit() {
    this.as.register(this);
    // console.log('Opening modal');
    // $(this.modalContainer.nativeElement).modal();
    // window.setTimeout(() => {
    //   $(this.modalContainer.nativeElement).modal('hide');
    // }, 2000)
  }

  public open(header: string, body: string, type: ALERT_TYPE, duration: number = 2000) {
    this.mHeader = header;
    this.mBody = body;
    this.currType = type;
    $(this.modalContainer.nativeElement).modal();
    window.setTimeout( () => {
      $(this.modalContainer.nativeElement).modal('hide');
    }, duration);
  }

  private getStyles () {
//TODO: implement different types
    //   switch (this.currType) {
  //     case ALERT_TYPE.ERROR :
  //       return "alert alert-danger";
  //     case ALERT_TYPE.INFO:
  //       return "alert alert-primary";
  //     default:
  //       return "";
  //   }
  }
}
