import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, map  } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      photo: [''],
      email: ['', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      [emailCheck(this.auth)]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    }, 
    { validator: checkPasswords('password', 'repeatPassword') });
  }

  get email() {
    return this.form.get('email');
  }

  get getErrorMessage() {
    if (this.email?.hasError('pattern')) {
      return 'Email Invalido';
    }
    if(this.email?.hasError('emailExists')){
      return 'El correo electrónico está en uso';
    }
    return '';
  }

  get repeatPassword(){
    return this.form.get('repeatPassword');
  }

  get getErrorRepeatPassword(){
    if(this.repeatPassword?.hasError('mustMatch')){
      return 'Las Contraseñas no coinciden';
    }
    return '';
  }

  save(){
    if(this.form?.invalid){
      return;
    }

    const user: User = this.form?.value;

    this.auth.createUser(user).subscribe(res => {
      if(res.succeeded){
        this.toastr.success('Usuario creado correctamente');
        this.router.navigate(['/auth/login']);
      }else{
        this.toastr.error(res.message);
      }
    }, error => {
      this.toastr.error(error?.error?.message);
    })
    
  }

}

export function emailCheck(api: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return api.existEmail(control.value)
      .pipe(
        map(({data}) => data ? {emailExists: true} : null)
      );
  };
}


export function  checkPasswords(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}