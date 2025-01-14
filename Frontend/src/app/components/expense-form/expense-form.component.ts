import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../shared/services/expense.service";
import {MessageService} from "primeng/api";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  providers: [MessageService]
})

export class ExpenseFormComponent implements OnInit {

  expenseForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private expenseService: ExpenseService,
              private _dialogRef: MatDialogRef<ExpenseFormComponent>,
              private _coreService: CoreService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.expenseForm = this._fb.group({
      expenseName: ['', Validators.required],
      expenseCategory: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      count: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  ngOnInit() {
    this.expenseForm.patchValue(this.data);
  }

  onSaveForm() {
    if(this.expenseForm.valid) {
      if(this.data) {
        this.expenseService.updateExpense(this.expenseForm.value, this.data._id).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      } else {
        console.log(this.expenseForm.value);
        this.expenseService.addExpense(this.expenseForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    }else {
      console.log('Sth not working')
    }
  }

  closeForm() {
    this._dialogRef.close(true);
  }
}
