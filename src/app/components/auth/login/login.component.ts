import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ERROR, ROLE } from 'src/app/constant';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToasterService } from 'src/app/services/toaster/toaster.service';
import { Auth } from 'src/app/store/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(
    private store: Store,
    private toasterService: ToasterService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.form = this.initForm();
  }

  ngOnInit(): void {}

  initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.form.status === 'INVALID') {
      return;
    }

    this.store.dispatch(new Auth.Login(this.form.value)).subscribe(
      (resp: any) => {
        // this.toasterService.success('Here is your message!!');
        this.redirectTo();
      },
      (err) => {
        this.toasterService.failed(err?.error?.message);
      }
    );
  }

  redirectTo(): void {
    if (
      this.localStorage.CurrentUserRole === ROLE.MEMBER ||
      this.localStorage.CurrentUserRole === ROLE.MANAGER
    ) {
      this.router.navigate(['/self-appraisal']);
    }
    else if(this.localStorage.CurrentUserRole === ROLE.CEO ) {
      this.router.navigate(['/assign-members']);
    } 
    else {
      this.router.navigate(['/dashboard']);
    }
  }

  get EmailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get PasswordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get EmailError(): string {
    if (this.email.hasError('required')) {
      return ERROR.REQUIRED.EMAIL;
    }

    return this.email.hasError('email') ? ERROR.NOT_VALID.EMAIL : '';
  }

  get PasswordError(): string {
    if (this.PasswordControl.hasError('required')) {
      return ERROR.REQUIRED.PASSWORD;
    }

    return this.PasswordControl.hasError('password')
      ? ERROR.NOT_VALID.PASSWORD
      : '';
  }
}
