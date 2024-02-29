import { Component, OnInit } from '@angular/core';
import { AuthService } from "./shared/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Router } from "@angular/router";
import { CoreService } from "./core/core.service";
import {ExpenseFormComponent} from "./components/expense-form/expense-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService]
})
export class AppComponent implements OnInit {

  items!: MenuItem[];

  constructor(
    public authService: AuthService,
    public _dialog: MatDialog,
    private router: Router,
    private confirmationService: ConfirmationService,
    private _coreService: CoreService
  ) { }

  ngOnInit() {
    this.items = [
      { label: 'User Profile', routerLink: '/current' },
      { label: 'Backlog', routerLink: '/backlog' }
    ];
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate([""])
  }
  openExpenseAddEditForm() {
    const dialogRef = this._dialog.open(ExpenseFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.router.navigate(['expenses']);
          location.reload();
        }
      }
    });
  }
}
