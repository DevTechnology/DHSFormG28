import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable()
export class CreateAccountService {
  private accountURL = 'http://' + window.location.hostname + ':3000/user/create-account';
  private rolesURL = 'http://' + window.location.hostname + ':3000/api/getRoles';

  constructor(private http: HttpClient, private router: Router) { }

  createUserAccount(user) {

    console.log('Trying to Authenticate User -> ' + JSON.stringify(user));

    const req = this.http.post(this.accountURL, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      role: user.role,
      email: user.email
    });

    return req;
  }

  getAllRoles() {
    console.log('Trying to get all roles');

    const req = this.http.get(this.rolesURL);

    return req;
  }

}
