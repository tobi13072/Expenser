import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ConfirmationService, MessageService} from "primeng/api";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ExpenseFormComponent} from "../expense-form/expense-form.component"
import {Router} from "@angular/router";
import {CoreService} from "../../core/core.service";
import {ExpenseService} from "../../shared/services/expense.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class ExpensesComponent implements OnInit {

  displayedColumns: string[] = ['expenseName', 'expenseCategory', 'paymentMethod', 'price', 'count', 'action'];
  dataSource!: MatTableDataSource<any>;
  constructor(private expenseService: ExpenseService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              public _dialog: MatDialog,
              public router: Router,
              private _coreService: CoreService) {
  }

  ngOnInit(): void {
    this.getIssuesList();
  }

  getIssuesList() {
    this.expenseService.getAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteIssue(id: any) {
    this.expenseService.deleteExpense(id).subscribe({
      next: (res) => {
        this.getIssuesList();
        console.log('Issue was deleted');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ExpenseFormComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getIssuesList();
        }
      }
    });
  }
}
