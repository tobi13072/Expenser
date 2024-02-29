import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/authconfig/auth.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from '@angular/material/grid-list';
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import {PasswordModule} from "primeng/password";
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { ToastModule } from 'primeng/toast';
import {RippleModule} from "primeng/ripple";
import { ExpensesComponent } from './components/expenses/expenses.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SplitterModule} from "primeng/splitter";
import {DividerModule} from "primeng/divider";
import { SpeedDialModule } from 'primeng/speeddial';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    ExpenseFormComponent,
    ExpensesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    CardModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    PasswordModule,
    MatDialogModule,
    MatSelectModule,
    ToastModule,
    RippleModule,
    MatTableModule,
    MatPaginatorModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    MatSnackBarModule,
    MatSidenavModule,
    BreadcrumbModule,
    SplitterModule,
    DividerModule,
    SpeedDialModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
