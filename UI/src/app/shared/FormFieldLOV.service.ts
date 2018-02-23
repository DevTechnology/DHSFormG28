import {Injectable} from "@angular/core";
import {StateLOVS} from "./FormLOVS"

@Injectable()
export class FormFieldLOVService {
  constructor(){}

  public getStateLOVs(): string[] {
    return StateLOVS;
  }

}
