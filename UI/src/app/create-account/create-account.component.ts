import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { CreateAccountService } from '../create-account.service';
import { GetrolesService } from '../getroles.service';
import { User } from '../user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  public loading = false;
  user = new User('', '', '', '', '', '', false, '');
  password1 = '';
  password2 = '';
  adhoc_passwords = '';
  createAccountForm: FormControl;
  roles = [];

  constructor(private router: Router, private accountService: CreateAccountService, private rolesService: GetrolesService ) { }

  ngOnInit() {
    document.getElementById('whoami').textContent = 'CREATE NEW ACCOUNT';
    const req = this.rolesService.getRoles();
    req.subscribe(
      res => {
        console.log(res);
        try {
          if (!res['success']) {
            // TODO: Make a nicer alert dialog box
            alert('Unexpected Error.  Failed to retrieve Roles.');
          } else {
            // TODO: Make nice dialog for success
            console.log('ROLES -> ' + JSON.stringify(res));

            const rls = res['roles'];
            console.log('Roles Length: ' + rls.length);
            for (let i = 0; i < rls.length; i++) {
              console.log('Role_Name: ' + rls[i]['role_name']);
              this.roles.push(rls[i]['role_name']);
            }
          }
        } catch (e) {
          alert('An Unexpected Exception Occurred!');
        }
      },
      err => {
        console.log('Error occured');
        alert('An Unexpected Exception Occurred!  Problem loading Roles.');
      }
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }

  createNewAccount() {

    console.log('Create New Account button clicked');

    if (this.password1 === this.password2) {
      this.user.password = this.password1;
    } else {
      this.adhoc_passwords = 'Passwords must match';
      return;
    }

    this.loading = true;

    // TODO: Create an account and take user bak to login screen
    this.accountService.createUserAccount(this.user).subscribe(
      res => {
        this.loading = false;
        console.log(res);
        try {
          if (!res['success']) {
            // TODO: Make a nicer alert dialog box
            alert('Unexpected Error.  Failed to Create Account.');
          } else {
            // TODO: Make nice dialog for success
            alert('Account Creation Successful');
            this.router.navigate(['/']);
          }
        } catch (e) {
          alert('An Unexpected Exception Occurred!');
        }
      },
      err => {
        console.log('Error occured');
        alert('An Unexpected Exception Occurred!');
        this.loading = false;
      }
    );
  }

}
