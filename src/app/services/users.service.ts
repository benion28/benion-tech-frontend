import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from './notifications.service';

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
  addAdminUserURL = 'https://benion-tech.herokuapp.com/benion-admin-users/api/benion-admin-add-user';
  updateAdminUserURL = 'https://benion-tech.herokuapp.com/benion-admin-users/api/benion-admin-edit-user';
  adminLoginURL = 'https://benion-tech.herokuapp.com/benion-admin-users/api/benion-admin-user-login';
  loginUsersURL = 'https://benion-tech.herokuapp.com/benion-users/api/benion-login-users';
  loginUserRegisterURL = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-register';
  userLoginURL = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-login';
  addLogInUserURL = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-add-user';
  updateLogInUserURL = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-edit-user';
  logoutUrl = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-logout';
  adminHomeUrl = 'https://benion-tech.herokuapp.com/benion-admin/api';
  loginUserPasswordChangeUrl = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-change-password';
  adminUserPasswordChangeUrl = 'https://benion-tech.herokuapp.com/benion-admin-users/api/benion-admin-change-password';
  activateLoginUserUrl = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-activate-email';
  activateAdminUserUrl = 'https://benion-tech.herokuapp.com/benion-admin-users/api/benion-admin-activate-email';
  forgetLoginPasswordUrl = 'https://benion-tech.herokuapp.com/benion-users/api/benion-users-forget-password';
  forgetAdminPasswordUrl = 'https://benion-tech.herokuapp.com/benion-admin-users/api/benion-admin-forget-password';

  adminUser = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    token: null
  };

  logInUser = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    token: null
  };

  currentUser = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    token: null
  };

  adminUsers = [];
  loginUsers = [];
  responseData = [];
  authResponse = [];
  totalAdminUsers;
  totalLoginUsers;

  constructor(
    private http: HttpClient,
    public notificationsService: NotificationsService
  ) {}

  userSignInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  adminSignInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  adminForgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  userForgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  adminChangePasswordForm: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  activateAdminForm: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required])
  });

  activateUserForm: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required])
  });

  userChangePasswordForm: FormGroup = new FormGroup({
    token: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  userSignUpForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    firstname: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    city: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  adminSignUpForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    firstname: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    city: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  validateSignUpPasswords(user) {
    if (user.password === user.password2) {
      return true;
    } else {
      return false;
    }
  }

  getAdminAuthorized() {
    const requestHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.adminUser.token}`
      })
    };

    return this.http.post<any>(this.adminHomeUrl, requestHeader);
  }

  checkAuthorization(data) {
    if (data !== null) {
      this.authResponse.push(data);
      const authentication = this.authResponse[0].authentication;
      if (authentication) {
        this.notificationsService.success(
          `:: ${this.authResponse[0].message} ::`
        );
        this.authResponse = [];
      } else {
        this.notificationsService.warn(`:: ${this.authResponse[0].message} ::`);
        this.authResponse = [];
      }
      this.notificationsService.success(
        ':: Authentication Successfull, Access Granted !!! ::'
      );
    }
  }

  checkAuthentication(data) {
    if (data === 'status') {
      this.notificationsService.warn(':: Server Error, Access Denied ?!! ::');
    }

    if (data === 'error') {
      this.notificationsService.warn(
        ':: Authentication Failed, Access Denied ?!! ::'
      );
    }
  }

  initializeUserSignUpFormGroup() {
    this.userSignUpForm.setValue({
      _id: null,
      firstname: '',
      lastname: '',
      username: '',
      city: '',
      email: '',
      password: '',
      password2: ''
    });
  }

  initializeAdminSignUpFormGroup() {
    this.userSignUpForm.setValue({
      _id: null,
      firstname: '',
      lastname: '',
      username: '',
      city: '',
      email: '',
      password: '',
      password2: ''
    });
  }

  initializeUserSignInForm() {
    this.userSignInForm.setValue({
      username: '',
      password: ''
    });
  }

  initializeUserForgetPasswordForm() {
    this.userForgetPasswordForm.setValue({
      email: ''
    });
  }

  initializeAdminForgetPasswordForm() {
    this.adminForgetPasswordForm.setValue({
      email: ''
    });
  }

  initializeActivateAdminForm() {
    this.activateAdminForm.setValue({
      token: ''
    });
  }

  initializeActivateUserForm() {
    this.activateUserForm.setValue({
      token: ''
    });
  }

  initializeAdminSignInForm() {
    this.adminSignInForm.setValue({
      username: '',
      password: ''
    });
  }

  initializeAdminChangePasswordForm() {
    this.adminChangePasswordForm.setValue({
      token: '',
      password: ''
    });
  }

  initializeUserChangePasswordForm() {
    this.userChangePasswordForm.setValue({
      token: '',
      password: ''
    });
  }

  userLogIn(user) {
    const logInDetails = {
      username: user.username,
      password: user.password
    };
    // Make Request
    this.http
      .post<any>(this.userLoginURL, logInDetails, httpOptions)
      .subscribe(data => {
        this.responseData.push(data);
        const success = this.responseData[0].success;
        if (success) {
          this.notificationsService.success(
            ':: User Logged In Successfully ::'
          );
          const userDetail = this.responseData[0].data;
          this.logInUser = {
            firstname: userDetail.user.firstname,
            lastname: userDetail.user.firstname,
            username: userDetail.user.username,
            email: userDetail.user.email,
            token: userDetail.token
          };
          this.currentUser = {
            firstname: userDetail.user.firstname,
            lastname: userDetail.user.firstname,
            username: userDetail.user.username,
            email: userDetail.user.email,
            token: userDetail.token
          };
          this.responseData = [];
        } else {
          this.notificationsService.warn(':: User Log In Failed, Try Again ::');
          this.responseData = [];
        }
      });
  }

  loginUserPasswordChange(user) {
    const userDetails = {
      password: user.password
    };
    if (this.adminUser.username !== null) {
      this.http
        .put<any>(
          `${this.loginUserPasswordChangeUrl}/${user.token}`,
          userDetails,
          httpOptions
        )
        .subscribe(data => {
          this.responseData.push(data);
          const success = this.responseData[0].success;
          if (success) {
            this.notificationsService.success(
              `:: ${this.responseData[0].message} ::`
            );
            this.responseData = [];
          } else {
            this.notificationsService.warn(
              `:: ${this.responseData[0].error} ::`
            );
            this.responseData = [];
          }
        });
    }
  }

  adminUserPasswordChange(user) {
    const userDetails = {
      password: user.password
    };
    if (this.adminUser.username !== null) {
      this.http
        .put<any>(
          `${this.adminUserPasswordChangeUrl}/${user.token}`,
          userDetails,
          httpOptions
        )
        .subscribe(data => {
          this.responseData.push(data);
          const success = this.responseData[0].success;
          if (success) {
            this.notificationsService.success(
              `:: ${this.responseData[0].message} ::`
            );
            this.responseData = [];
          } else {
            this.notificationsService.warn(
              `:: ${this.responseData[0].error} ::`
            );
            this.responseData = [];
          }
        });
    }
  }

  forgetLoginPassword(user) {
    const userDetails = {
      email: user.email
    };
    this.http
      .put<any>(this.forgetLoginPasswordUrl, userDetails, httpOptions)
      .subscribe(data => {
        this.responseData.push(data);
        const success = this.responseData[0].success;
        if (success) {
          this.notificationsService.success(
            `:: ${this.responseData[0].message} ::`
          );
          this.responseData = [];
        } else {
          this.notificationsService.warn(`:: ${this.responseData[0].error} ::`);
          this.responseData = [];
        }
      });
  }

  forgetAdminPassword(user) {
    const userDetails = {
      email: user.email
    };
    this.http
      .put<any>(this.forgetAdminPasswordUrl, userDetails, httpOptions)
      .subscribe(data => {
        this.responseData.push(data);
        const success = this.responseData[0].success;
        if (success) {
          this.notificationsService.success(
            `:: ${this.responseData[0].message} ::`
          );
          this.responseData = [];
        } else {
          this.notificationsService.warn(`:: ${this.responseData[0].error} ::`);
          this.responseData = [];
        }
      });
  }

  activateLoginUser(user) {
    if (this.adminUser.username !== null) {
      this.http
        .post<any>(`${this.activateLoginUserUrl}/${user.token}`, httpOptions)
        .subscribe(data => {
          this.responseData.push(data);
          const success = this.responseData[0].success;
          if (success) {
            this.notificationsService.success(
              `:: ${this.responseData[0].message} ::`
            );
            this.responseData = [];
          } else {
            this.notificationsService.warn(
              `:: ${this.responseData[0].error} ::`
            );
            this.responseData = [];
          }
        });
    }
  }

  activateAdminUser(user) {
    if (this.adminUser.username !== null) {
      this.http
        .post<any>(`${this.activateAdminUserUrl}/${user.token}`, httpOptions)
        .subscribe(data => {
          this.responseData.push(data);
          const success = this.responseData[0].success;
          if (success) {
            this.notificationsService.success(
              `:: ${this.responseData[0].message} ::`
            );
            this.responseData = [];
          } else {
            this.notificationsService.warn(
              `:: ${this.responseData[0].error} ::`
            );
            this.responseData = [];
          }
        });
    }
  }

  registerLoginUser(user) {
    const logInDetails = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      city: user.city,
      email: user.email,
      password: user.password,
      password2: user.password2
    };
    // Make Request
    if (this.adminUser.username !== null) {
      // Admin Request
      this.http
        .post<any>(this.addLogInUserURL, logInDetails, httpOptions)
        .subscribe(data => {
          this.responseData.push(data);
          const success = this.responseData[0].success;
          if (success) {
            console.log(this.responseData);
            this.notificationsService.success(
              `:: ${this.responseData[0].message} ::`
            );
            this.responseData = [];
          } else {
            this.notificationsService.warn(
              `:: ${this.responseData[0].error} ::`
            );
            this.responseData = [];
          }
        });
    } else {
      // User Request
      this.http
        .post<any>(this.loginUserRegisterURL, logInDetails, httpOptions)
        .subscribe(data => {
          this.responseData.push(data);
          const success = this.responseData[0].success;
          if (success) {
            this.notificationsService.success(
              `:: ${this.responseData[0].message} ::`
            );
            this.responseData = [];
          } else {
            this.notificationsService.warn(
              `:: ${this.responseData[0].error} ::`
            );
            this.responseData = [];
          }
        });
    }
  }

  registerAdminUser(user) {
    const logInDetails = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      city: user.city,
      email: user.email,
      password: user.password,
      password2: user.password2
    };
    // Make Request
    this.http
      .post<any>(this.addAdminUserURL, logInDetails, httpOptions)
      .subscribe(data => {
        this.responseData.push(data);
        const success = this.responseData[0].success;
        if (success) {
          this.notificationsService.success(
            `:: ${this.responseData[0].message} ::`
          );
          this.responseData = [];
        } else {
          this.notificationsService.warn(`:: ${this.responseData[0].error} ::`);
          this.responseData = [];
        }
      });
  }

  upDateLoginUser(user) {
    const logInDetails = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      city: user.city,
      email: user.email,
      password: user.password,
      password2: user.password2
    };

    // Update In UI
    const modifiedUsers = this.loginUsers.filter(
      userDetails => userDetails._id !== logInDetails._id
    );
    this.loginUsers = [...modifiedUsers, logInDetails];

    // Make Request
    const url = `${this.updateLogInUserURL}/${user._id}`;
    this.http.put<any>(url, logInDetails, httpOptions).subscribe(data => {
      this.responseData.push(data);
      const success = this.responseData[0].success;
      if (success) {
        this.notificationsService.success(
          `:: ${this.responseData[0].message} ::`
        );
        this.responseData = [];
      } else {
        this.notificationsService.warn(`:: ${this.responseData[0].error} ::`);
        this.responseData = [];
      }
    });
  }

  upDateAdminUser(user) {
    const logInDetails = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      city: user.city,
      email: user.email,
      password: user.password,
      password2: user.password2
    };

    // Update In UI
    const modifiedUsers = this.adminUsers.filter(
      userDetails => userDetails._id !== logInDetails._id
    );
    this.adminUsers = [...modifiedUsers, logInDetails];

    // Make Request
    const url = `${this.updateAdminUserURL}/${user._id}`;
    this.http.put<any>(url, logInDetails, httpOptions).subscribe(data => {
      this.responseData.push(data);
      const success = this.responseData[0].success;
      if (success) {
        this.notificationsService.success(
          `:: ${this.responseData[0].message} ::`
        );
        this.responseData = [];
      } else {
        this.notificationsService.warn(`:: ${this.responseData[0].error} ::`);
        this.responseData = [];
      }
    });
  }

  adminLogIn(user) {
    const logInDetails = {
      username: user.username,
      password: user.password
    };
    // Make Request
    this.http
      .post<any>(this.adminLoginURL, logInDetails, httpOptions)
      .subscribe(data => {
        this.responseData.push(data);
        const success = this.responseData[0].success;
        if (success) {
          this.notificationsService.success(
            ':: Admin Logged In Successfully ::'
          );
          const userDetail = this.responseData[0].data;
          this.adminUser = {
            firstname: userDetail.user.firstname,
            lastname: userDetail.user.firstname,
            username: userDetail.user.username,
            email: userDetail.user.email,
            token: userDetail.token
          };
          this.currentUser = {
            firstname: userDetail.user.firstname,
            lastname: userDetail.user.firstname,
            username: userDetail.user.username,
            email: userDetail.user.email,
            token: userDetail.token
          };
          this.responseData = [];
        } else {
          this.notificationsService.warn(
            ':: Admin Log In Failed, Try Again ::'
          );
          this.responseData = [];
        }
      });
  }

  populateAdminSignUpForm(user) {
    this.adminSignUpForm.setValue(user);
  }

  populateUserSignUpForm(user) {
    this.userSignUpForm.setValue(user);
  }

  signOut() {
    // Make Request
    this.http.get<any>(this.logoutUrl).subscribe(data => {
      this.responseData.push(data);
      const success = this.responseData[0].success;
      if (success) {
        this.notificationsService.success(
          `:: ${this.responseData[0].message} ::`
        );
        if (this.adminUser.username !== null) {
          this.adminUser = {
            firstname: null,
            lastname: null,
            username: null,
            email: null,
            token: null
          };
          this.currentUser = {
            firstname: null,
            lastname: null,
            username: null,
            email: null,
            token: null
          };
        } else {
          this.logInUser = {
            firstname: null,
            lastname: null,
            username: null,
            email: null,
            token: null
          };
          this.currentUser = {
            firstname: null,
            lastname: null,
            username: null,
            email: null,
            token: null
          };
        }
        this.responseData = [];
      } else {
        this.notificationsService.warn(':: Failed To Log Out, Try Again ::');
        this.responseData = [];
      }
    });
  }

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
    const url = `${this.adminUsersURL}/${user._id}`;
    return this.http.delete<any>(url, httpOptions);
  }

  // Delete A Login User
  deleteLoginUser(user): Observable<any> {
    const url = `${this.loginUsersURL}/${user._id}`;
    return this.http.delete<any>(url, httpOptions);
  }
}
