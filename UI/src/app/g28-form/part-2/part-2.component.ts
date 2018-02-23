import { Component, OnInit } from '@angular/core';
import { FormFieldLOVService} from "../../shared/FormFieldLOV.service";
import {AlertService} from "../../shared/alert.service";

@Component({
  selector: 'app-part-2',
  templateUrl: './part-2.component.html',
  styleUrls: ['./part-2.component.css']
})
export class Part2Component implements OnInit {
  //TODO: form model
  state: string = "";

  constructor(public lovService: FormFieldLOVService, private as: AlertService) { }

  ngOnInit() {
  }

  notifySaved() {
    this.as.open('Success', 'Part Two Saved');
  }
}
