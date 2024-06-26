import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any
  

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
            )
        })
      );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          return this.handleError(errorResponse);
        }),
        tap((responseData) => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn
            )
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
        return
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadedUser.token) {
        this.user.next(loadedUser)
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.autoLogout(expirationDuration)
    }
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer)
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {this.logout()}, expirationDuration)
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
        email,
        id,
        token,
        expirationDate
    );
    this.user.next(user);

    this.autoLogout(expiresIn*1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);

    let errorMessage = 'An Unknown error has occured!';
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMessage =
          'The email address is already in use by another account.';
        break;
      }
      case 'OPERATION_NOT_ALLOWED': {
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      }
      case 'INVALID_LOGIN_CREDENTIALS': {
        errorMessage = 'The login credentials are not correct!';
        break;
      }
    }
    return throwError(errorMessage);
  }
}
