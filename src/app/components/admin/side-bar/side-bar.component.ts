import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ISideNav } from 'src/app/store/auth/auth.interface';
import { AuthState } from 'src/app/store/auth/auth.state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  @Select(AuthState.sideNav) sideNav$: Observable<ISideNav[]> | undefined;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
