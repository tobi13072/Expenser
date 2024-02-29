import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url: string = 'http://localhost:3000/api/auth';
  headers = new HttpHeaders().set('Content-Type', 'application-json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let endpoint = `${this.base_url}/register`;
    return this.http.post(endpoint, user).pipe(catchError(this.handleError))
  }

  signIn(user: User) {
    return this.http
      .post<any>(`${this.base_url}/login`, user);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  deleteAccount() {
    let endpoint = `${this.base_url}/deleteAccount`;
    return this.http.delete(endpoint).pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }

  getUserProfile(): Observable<any> {
    let endpoint = `${this.base_url}/current`;
    return this.http.get(endpoint, {headers: this.headers}).pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
