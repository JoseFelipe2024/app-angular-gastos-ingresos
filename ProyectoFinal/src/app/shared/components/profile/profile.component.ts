import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProfileComponent>,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [this.authService.getUser()?.id],
      firstName: [this.authService?.getUser()?.firstName, [Validators.required]],
      lastName: [this.authService?.getUser()?.lastName, [Validators.required]],
      email: [this.authService?.getUser()?.email],
    });
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  apply() {
    if(this.form.invalid){
      return;
    }
    const user: User = this.form?.value;
    this.authService.updateProfile(user).subscribe({
      next: res => {
        this.toastr.success('Perfil Actualizado');
        this.close();
      }, error: res => {
        this.toastr.error('Ocurrió un error actualizando el perfil');
      }
    });
  }

}