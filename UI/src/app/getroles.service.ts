import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class GetrolesService {
  private rolesURL = 'http://' + window.location.hostname + ':3000/user/roles';

  constructor(private http: HttpClient, private router: Router) { }

  getRoles() {
    const req = this.http.get(this.rolesURL, {});
    return req;
  }
}
