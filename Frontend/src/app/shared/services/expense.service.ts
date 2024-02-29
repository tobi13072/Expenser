import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  base_url = "http://localhost:3000/api/expense";

  constructor(private http: HttpClient) { }

  addExpense(data: any) : Observable<any> {
    return this.http.post(`${this.base_url}/add`, data);
  }

  updateExpense(data: any, id: any) : Observable<any> {
    return this.http.put(`${this.base_url}/update/${id}`, data);
  }

  deleteExpense(id: string) : Observable<any> {
    return this.http.delete(`${this.base_url}/delete/${id}`);
  }

  getAll() : Observable<any> {
    return this.http.get(`${this.base_url}/all`);
  }
}
