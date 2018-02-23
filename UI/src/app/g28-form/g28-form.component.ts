import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

@Component({
  selector: 'app-g28-form',
  templateUrl: './g28-form.component.html',
  styleUrls: ['./g28-form.component.css']
})
export class G28FormComponent implements OnInit {

  role_name = '';
  constructor(private router: Router) { }

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
}
