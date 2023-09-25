import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Auth } from 'src/app/store/auth/auth.action';
import { Company } from 'src/app/store/company/company.action';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  curtentUserId = this.localStorage.CurrentUserId;
  constructor(private store: Store, private router: Router, 
    private localStorage: LocalStorageService,) { }

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

  downloadPDF() {
    this.store.dispatch(new Company.DownloadPDF(+this.curtentUserId)).subscribe((res) => {
    });
  }

}
