import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, take} from 'rxjs/operators';
import {RegisterService} from './service/register.service';
import {TranslateService} from '@ngx-translate/core';
import {ParseService} from '../../shared/parsers/parse.service';
import {SessionService} from '../../shared/services/session.service';
import {RegistrationForm} from '../../shared/models/RegistrationForm';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  registrationForm: FormGroup;
  statusLabelSuccess: string;
  statusLabelFailure: string;

  nameValid: AbstractControl;
  surnameValid: AbstractControl;
  emailValid: AbstractControl;
  employeeIDValid: AbstractControl;
  passwordValid: AbstractControl;
  roleValid: AbstractControl;
  areasValid: AbstractControl;

  isPreformingRegistration = false;

  selected = -1;


  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              public parseService: ParseService,
              private sessionService: SessionService,
              public translate: TranslateService) {

    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      employeeID: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      areas: ['', [Validators.required]],
    });

    this.nameValid = this.registrationForm.controls.name;
    this.surnameValid = this.registrationForm.controls.surname;
    this.emailValid = this.registrationForm.controls.email;
    this.employeeIDValid = this.registrationForm.controls.employeeID;
    this.passwordValid = this.registrationForm.controls.password;
    this.roleValid = this.registrationForm.controls.role;
    this.areasValid = this.registrationForm.controls.areas;
  }

  ngOnInit(): void {
    this.registrationForm.get('name').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('surname').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('email').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('employeeID').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('password').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('role').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
  }

  forceValidAgain(): void {
    this.nameValid.updateValueAndValidity();
    this.surnameValid.updateValueAndValidity();
    this.emailValid.updateValueAndValidity();
    this.employeeIDValid.updateValueAndValidity();
    this.passwordValid.updateValueAndValidity();
    this.roleValid.updateValueAndValidity();
    this.areasValid.updateValueAndValidity();
  }

  get f(): any {
    return this.registrationForm.controls;
  }

  onChange(event) {
    console.log(event);
  }

  onSubmit(): void {
    // stop here if form is invalid

    if (this.registrationForm.invalid) {
      this.setRegisterErrorStatusLabel(RegisterStatus.INCORRECT_FORM);
      return;
    }

    const registerData = new RegistrationForm(this.registrationForm.value);
    console.log(registerData);

    this.isPreformingRegistration = true;


    this.registerService.preformRegistrationAttempt(registerData)
      .then(success => {
          this.setRegisterSuccessStatusLabel(RegisterStatus.REGISTRATION_SUCCESSFUL);
          this.registrationForm.reset();
        },
        failure => {
          console.log(failure.message);
          this.setRegisterErrorStatusLabel(RegisterStatus.INVALID_CREDENTIALS);
        });
  }

  setRegisterErrorStatusLabel(status: RegisterStatus): void {
    switch (status) {
      case RegisterStatus.CONN_REFUSED:
        this.statusLabelFailure = 'odmowa dostępu';
        this.isPreformingRegistration = false;
        return;
      case RegisterStatus.INVALID_CREDENTIALS:
        this.statusLabelFailure = 'odmowa dostępu';
        this.isPreformingRegistration = false;
        return;
      case RegisterStatus.ALREADY_REGISTERED:
        this.statusLabelFailure = 'użytkownik już zarejestrowany';
        this.isPreformingRegistration = false;
        return;
      case RegisterStatus.ID_IN_USE:
        this.statusLabelFailure = 'ID jest w użyciu';
        this.isPreformingRegistration = false;
        return;
      default:
        this.statusLabelFailure = null;
        this.isPreformingRegistration = false;
        return;
    }
  }

  setRegisterSuccessStatusLabel(status: RegisterStatus): void {
    switch (status) {
      case RegisterStatus.REGISTRATION_SUCCESSFUL:
        this.statusLabelSuccess = 'Pomyślnie zarejestrowano nowego użytkownika';
        this.isPreformingRegistration = false;
        return;
      default:
        this.statusLabelSuccess = null;
        this.isPreformingRegistration = false;
        return;
    }
  }

  areaArrayPrototype(n: number): any[] {
    return Array(n);
  }

  roleArrayPrototype(n: number): any[] {
    return Array(n);
  }

  testClick(): void {
    this.sessionService.downloadUserData().then(success => {
      console.log(success);
    },
      failure => {
      console.log(failure);
      });
  }

}

enum RegisterStatus {
  CONN_REFUSED,
  INCORRECT_FORM,
  INVALID_CREDENTIALS,
  ALREADY_REGISTERED,
  ID_IN_USE,
  REGISTRATION_SUCCESSFUL
}
