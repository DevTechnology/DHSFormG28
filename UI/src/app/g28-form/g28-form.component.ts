import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
import {AlertService} from "../shared/alert.service";

@Component({
  selector: 'app-g28-form',
  templateUrl: './g28-form.component.html',
  styleUrls: ['./g28-form.component.css']
})
export class G28FormComponent implements OnInit {

  constructor(private router: Router, private as: AlertService) { }
  role_name = '';

  ngOnInit() {
    this.checkIfUserAuthenticated();
  }

  checkIfUserAuthenticated() {
    const currentUser = JSON.parse(localStorage.getItem('G28User'));
    if (currentUser === null || currentUser.authenticated !== true) {
      this.router.navigate(['/']);
    } else {
      const userId = currentUser['id'];
      this.role_name = currentUser['role_name'];
      console.log('User ' + userId + ' logged in.');

      if (this.role_name === 'Quality Assurance') {
        document.getElementById('whoami').textContent = 'Welcome, ' + userId + ' | ' + this.role_name;
        this.router.navigate(['qa']);
      } else {
        document.getElementById('whoami').textContent = 'Welcome, ' + userId + ' | ' + this.role_name;
      }
    }
  }
  notifySaved() {
    this.as.open("","Form Has Been Submitted");
  }
}
