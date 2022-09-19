import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModel } from 'src/app/shared/models/Login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService, 
    private toastr: ToastrService,
    private router: Router) { this.buildForm() }

  ngOnInit(): void {
  }

  buildForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    if(this.form.invalid){
      return;
    }
    const loginModel: LoginModel = this.form.value;
    this.auth.login(loginModel).subscribe(res => {
      if(res.succeeded){
        this.toastr.success('Usuario autenticado correctamente');
        this.auth.setUserAuth(res.data);
        this.router.navigate(['/']);
        return;
      }
      this.toastr.error(res.message);
    }, error => {
      this.toastr.error(error?.status === 401 ? error?.error : error?.status === 404 ? error?.error?.message : 'Ups, algo salió mal en el servidor.');
    })
  }

}
