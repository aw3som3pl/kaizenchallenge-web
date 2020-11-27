import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, take} from 'rxjs/operators';
import {RegisterService} from './service/register.service';
import {TranslateService} from '@ngx-translate/core';
import {ParseService} from '../../shared/parsers/parse.service';
import {SessionService} from '../../shared/services/session.service';
import {RegistrationForm} from '../../shared/models/RegistrationForm';
import {ArraysService} from '../../shared/parsers/arrays.service';
import {IapiError} from '../../shared/models/interfaces/iapi-error';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  registrationForm: FormGroup;

  statusVariant: number;
  operationOutcome = OperationOutcome;

  errorType: number;

  nameValid: AbstractControl;
  surnameValid: AbstractControl;
  emailValid: AbstractControl;
  employeeIDValid: AbstractControl;
  passwordValid: AbstractControl;
  roleValid: AbstractControl;
  areasValid: AbstractControl;
  accountStateValid: AbstractControl;

  isPreformingRegistration = false;

  selected = -1;


  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              public parseService: ParseService,
              public arraysService: ArraysService,
              public sessionService: SessionService,
              public translate: TranslateService) {

    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      employeeID: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      areas: ['', [Validators.required]],
      state: [sessionService.getUserState(), [Validators.required]]
    });

    this.nameValid = this.registrationForm.controls.name;
    this.surnameValid = this.registrationForm.controls.surname;
    this.emailValid = this.registrationForm.controls.email;
    this.employeeIDValid = this.registrationForm.controls.employeeID;
    this.passwordValid = this.registrationForm.controls.password;
    this.roleValid = this.registrationForm.controls.role;
    this.areasValid = this.registrationForm.controls.areas;
    this.accountStateValid = this.registrationForm.controls.state;
  }

  ngOnInit(): void {
    this.registrationForm.get('name').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('surname').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('email').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('employeeID').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('password').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('role').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('areas').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
    this.registrationForm.get('state').valueChanges.pipe(distinctUntilChanged()).subscribe(() => this.forceValidAgain());
  }

  forceValidAgain(): void {
    this.nameValid.updateValueAndValidity();
    this.surnameValid.updateValueAndValidity();
    this.emailValid.updateValueAndValidity();
    this.employeeIDValid.updateValueAndValidity();
    this.passwordValid.updateValueAndValidity();
    this.roleValid.updateValueAndValidity();
    this.areasValid.updateValueAndValidity();
    this.accountStateValid.updateValueAndValidity();
  }

  get f(): any {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    // stop here if form is invalid
    this.statusVariant = null;

    if (this.registrationForm.invalid) {
      return;
    }

    const registerData = new RegistrationForm(this.registrationForm.value);

    this.isPreformingRegistration = true;

    this.registerService.preformRegistrationAttempt(registerData)
      .then(success => {
          this.statusVariant = OperationOutcome.SUCCESS;
          this.isPreformingRegistration = false;
          console.log(this.statusVariant);
          this.onReset();
        },
        (failure: IapiError ) => {
          this.statusVariant = OperationOutcome.ERROR;
          this.errorType = failure.ErrorCode;
          this.isPreformingRegistration = false;
        });
  }

  onReset() {
    this.registrationForm.reset({
      state: this.sessionService.getUserState()
    });
  }

}

enum OperationOutcome {
  SUCCESS,
  ERROR
}
