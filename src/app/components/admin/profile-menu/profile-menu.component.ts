import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Auth } from 'src/app/store/auth/auth.action';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  editProfile() {
    // Handle edit profile logic
  }

  changePassword() {
    // Handle change password logic
  }

  logout(): void {
    // Handle logout logic
    this.store.dispatch(new Auth.Logout()).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

}
