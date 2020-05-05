import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  adminUsersURL = 'https://benion-tech.herokuapp.com/benion-admin-users/api/benion-admin-users-lists';
  loginUsersURL = 'https://benion-tech.herokuapp.com/benion-users/api/benion-login-users';

  constructor(private http: HttpClient) { }

  // Get All Admin Users
  getAdminUsers(): Observable<any> {
    return this.http.get<any>(this.adminUsersURL);
  }

  // Get All Login Users
  getLoginUsers(): Observable<any> {
    return this.http.get<any>(this.loginUsersURL);
  }

  // Delete An Admin User
  deleteAdminUser(user): Observable<any> {
    const url = `${ this.adminUsersURL }/${ user._id }`;
    return this.http.delete<any>(url, httpOptions);
  }

  // Delete A Login User
  deleteLoginUser(user): Observable<any> {
    const url = `${ this.loginUsersURL }/${ user._id }`;
    return this.http.delete<any>(url, httpOptions);
  }
}
