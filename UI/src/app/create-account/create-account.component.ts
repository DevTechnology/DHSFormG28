import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { CreateAccountService } from '../create-account.service';
import { User } from '../user';
import { Role } from '../role';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  private roles: Role[];

  public loading = false;
  user = new User('', '', '', '', '', null, false, '');
  password1 = '';
  password2 = '';
  adhoc_passwords = '';
  createAccountForm: FormControl;

  constructor(private router: Router, private accountService: CreateAccountService ) { }

  ngOnInit() {
    document.getElementById('whoami').textContent = 'CREATE NEW ACCOUNT';

    this.getAllRoles();
  }

  cancel() {
    this.router.navigate(['/']);
  }

  getAllRoles() {
    console.log('login form component : getting all roles');
    this.loading = true;
    this.accountService.getAllRoles().subscribe(
      res => {
        this.loading = false;
        console.log(res);
        try {
          if (!res['success']) {
            this.roles = res['rows'] as Role[];
            console.log(this.roles);
          } else {
            // TODO: Make nice dialog for success
            alert('Account Creation Successful');
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
        console.log("&&&&&" + res);
        try {
          if (!res['success']) {
            // TODO: Make a nicer alert dialog box
            let errmsg = 'Unexpected Error.  Failed to Create Account.';

            if (res['status'] === 507) {
              errmsg += 'The account already exists. Either user id or email is already been used.';
            }

            alert(errmsg);
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
        console.log(err);
        let errmsg = 'An Unexpected Exception Occurred!';

        if (err['status'] === 507) {
          errmsg += 'The account already exists. Either user id or email is already been used.';
        }

        alert(errmsg);
        this.loading = false;
      }
    );
  }

}
