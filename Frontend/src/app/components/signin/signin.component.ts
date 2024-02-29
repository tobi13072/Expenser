import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  signinForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router,
              private _coreService: CoreService) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value).subscribe((res:any) => {
      if (res.success) {
        localStorage.setItem('access_token', res.accessToken);
        this.router.navigate(['/dashboard']);
      } else {
        this.signinForm.setErrors({'email_or_password_invalid': 'Email or password are invalid'});
      }
    });
  }

  loginUser2(){
    this.authService.signIn(this.signinForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.accessToken);
        this.router.navigate(['/dashboard']);
      },
      error: (error) =>{
        this.signinForm.setErrors({'email_or_password_invalid': 'Email or password are invalid'});
      }
    });
  }

}
