import { Component, OnInit } from '@angular/core';
import { FormFieldLOVService } from "../../shared/FormFieldLOV.service";

@Component({
  selector: 'app-part-1',
  templateUrl: './part-1.component.html',
  styleUrls: ['./part-1.component.css']
})
export class Part1Component implements OnInit {
  // TODO: have a form model.
  state: string = "";

  constructor(public lovService: FormFieldLOVService) { }

  ngOnInit() {
  }

}
