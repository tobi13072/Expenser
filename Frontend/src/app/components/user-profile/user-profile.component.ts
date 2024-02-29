import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {ConfirmationService} from "primeng/api";
import {Router} from "@angular/router";
import {CoreService} from "../../core/core.service";

export class UserDetails {

  constructor(id?: string, firstName?:string, lastName?: string, email?: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  id!: string | undefined;
  firstName!: string | undefined;
  lastName!: string | undefined;
  email!: string | undefined;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [ConfirmationService]
})
export class UserProfileComponent implements OnInit{
  userData!: UserDetails;

  constructor(private authService: AuthService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private _coreService: CoreService) {
  }

  ngOnInit(): void {
    this.userData = new UserDetails();
    this.showUserProfile();
  }

  showUserProfile() {
    this.authService.getUserProfile().subscribe((res) => {
      this.userData.id = res.id;
      this.userData.firstName = res.firstName;
      this.userData.lastName = res.lastName;
      this.userData.email = res.email;
    });
    console.log(this.userData);
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe({
      next: (res) => {
        this.authService.doLogout();
        console.log('Account was deleted');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
