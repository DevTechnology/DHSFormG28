import { Injectable} from "@angular/core";
import {AlertComponent} from "../alert/alert.component";

export enum ALERT_TYPE {INFO, ERROR}


declare var $: any;
@Injectable()
export class AlertService {
  alertEl: AlertComponent;

  constructor() {}

  register(alert: AlertComponent) {
    this.alertEl = alert;
  }

  open(header: string, msg: string) {
    this.alertEl.open(header, msg, ALERT_TYPE.INFO);
  }
}
