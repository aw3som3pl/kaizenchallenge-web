import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {LoginService} from './service/login.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  submitted = false;
  isLoggingIn = false;
  statusLabel: string;

  loginForm: FormGroup;



  loginValid: AbstractControl;
  passwordValid: AbstractControl;

  constructor(private router: Router,
              private translate: TranslateService,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private authService: AuthService) {

    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginValid = this.loginForm.controls.login;
    this.passwordValid = this.loginForm.controls.password;


  }

  ngOnInit(): void {
    this.loginForm.get('login').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.loginForm.get('password').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
  }

  forceValidAgain(): void {
    this.loginValid.updateValueAndValidity();
    this.passwordValid.updateValueAndValidity();
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    // stop here if form is invalid
    this.submitted = true;

    if (this.loginForm.invalid) {
      if (this.loginValid.invalid){
        this.setLoginStatusLabel(LoginStatus.LOGIN_INVALID);
      }
      if (this.passwordValid.invalid){
        this.setLoginStatusLabel(LoginStatus.PASSWORD_INVALID);
      }
      return;
    }

    this.isLoggingIn = true;

    this.loginService.preformLoginAttempt(this.loginForm.value.login, this.loginForm.value.password)
      .then(success => {
        this.onLoginSuccess();
      },
      failure => {
        this.setLoginStatusLabel(LoginStatus.INVALID_CREDENTIALS);
      });
  }

  setLoginStatusLabel(status: LoginStatus): void {
    switch (status) {
      case LoginStatus.CONN_REFUSED:
        this.translate.get('Login.Status.connFailure').pipe(take(1)).subscribe((s: string) => {
          this.statusLabel = s;
          this.submitted = false;
          this.isLoggingIn = false;
        });
        return;
      case LoginStatus.INVALID_CREDENTIALS:
        this.translate.get('Login.Status.invalidCredentials').pipe(take(1)).subscribe((s: string) => {
          this.statusLabel = s;
          this.submitted = false;
          this.isLoggingIn = false;
        });
        return;
      case LoginStatus.RECENT_LOGOUT:
        this.translate.get('Login.Status.afterLogout').pipe(take(1)).subscribe((s: string) => {
          this.statusLabel = s;
          this.submitted = false;
          this.isLoggingIn = false;
        });
        return;
      case LoginStatus.LOGIN_INVALID:
        this.translate.get('Login.Status.loginInvalid').pipe(take(1)).subscribe((s: string) => {
          this.statusLabel = s;
          this.submitted = false;
          this.isLoggingIn = false;
        });
        return;
      case LoginStatus.PASSWORD_INVALID:
        this.translate.get('Login.Status.passwordInvalid').pipe(take(1)).subscribe((s: string) => {
          this.statusLabel = s;
          this.submitted = false;
          this.isLoggingIn = false;
        });
        return;
      default:
        this.submitted = false;
        this.isLoggingIn = false;
        return;
    }
  }

  onLoginSuccess(): void {
    this.submitted = false;
    this.isLoggingIn = false;
    this.router.navigate(['authenticated/home/create']);
  }
}

enum LoginStatus {
  CONN_REFUSED,
  INVALID_CREDENTIALS,
  RECENT_LOGOUT,
  LOGIN_INVALID,
  PASSWORD_INVALID
}
