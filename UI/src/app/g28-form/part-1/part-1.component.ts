import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { FormFieldLOVService } from "../../shared/FormFieldLOV.service";
import {AlertService} from "../../shared/alert.service";


@Component({
  selector: 'app-part-1',
  templateUrl: './part-1.component.html',
  styleUrls: ['./part-1.component.css']
})
export class Part1Component implements OnInit {
  // TODO: have a form model.
  state: string = "";
  attorneyInfoForm: FormGroup;

  constructor(public lovService: FormFieldLOVService, private fb: FormBuilder, private as: AlertService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(): void {
    this.attorneyInfoForm = this.fb.group({
      lastName: ["", Validators.required],
      firstName: ["", Validators.required],
      streetNumber: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required]
    });
  }

  notifySaved() {
    this.as.open("Success", "Part One Saved");
  }

}
