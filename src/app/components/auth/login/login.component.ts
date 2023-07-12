import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ERROR } from 'src/app/constant';
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

  constructor(private store: Store, private toasterService: ToasterService) {
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
    console.log("form >> ", this.form);
    this.store
      .dispatch(new Auth.Login(this.form.value))
      .subscribe((resp: any) => {
        this.toasterService.openSnackBar('Here is your message!!');
      });
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
