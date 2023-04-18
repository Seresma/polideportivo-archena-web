import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthResponse, Usuario} from "../interfaces/interfaces";
import {catchError, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return {...this._usuario}
  }

  constructor(private http: HttpClient) {
  }

  signup(email: string, username: string, password: string, rol: string) {
    const url = `${this.baseUrl}/auth/signup`;
    const body = {email, username, password, rol};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.token !== undefined)
            localStorage.setItem('token', resp.token!);
          this._usuario = {
            username: resp.username!,
            email: resp.email!,
            id: resp.id!,
            rol: resp.rol!
          }
        }),
        map(resp => resp.token !== undefined),
        catchError(err => of(err.error.message))
      );
  }


  login(username: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = {username, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.token !== undefined)
            localStorage.setItem('token', resp.token!);
          this._usuario = {
            username: resp.username!,
            email: resp.email!,
            id: resp.id!,
            rol: resp.rol!
          }
        }),
        map(resp => resp.token !== undefined),
        catchError(err => of(err.error.message))
      );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, {headers})
      .pipe(
        map(resp => {
            this._usuario = {
              username: resp.username!,
              email: resp.email!,
              id: resp.id!,
              rol: resp.rol!
            }
            return resp.token !== undefined;
          }),
        catchError(err => of(false)));
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return token !== undefined && token !== null && token !== '';
  }

  isUserAdmin(): boolean {
    return this._usuario && this._usuario.rol === 'ADMIN';
  }

}
