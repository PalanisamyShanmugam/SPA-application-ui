import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const API_BASE_URL = '';
const ERROR_WHITELIST = ['*'
];
const ERROR_APPOINTMENT_ORDER_WHITELIST = ['api/createAppointment', 'api/orders/create'];
const ERROR_API = 'api/error-log';
@Injectable()
export class ApiService {
 
  private cacheClearedSubject = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(HTTP_INTERCEPTORS) private interceptors: HttpInterceptor[],
    @Inject(LOCALE_ID) private locale: string
  ) {}

  defaultHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': this.locale
    }),
    observe: 'response'
  };

  post<T>(path: string, body?, options?: Object): Observable<T> {
    options = Object.assign({}, options, { body: this.formatBodyObject(body) });
    return this.request<T>('POST', path, options);
  }

  get<T>(path: string, options?: Object): Observable<T> {
    return this.request<T>('GET', path, options);
  }

  request<T>(method: string, path: string, options?: Object): Observable<T> {
    options = Object.assign({}, this.defaultHttpOptions, options);
    return this.http
      .request<HttpResponse<T>>(method, this.buildPath(path), options)
      .pipe(map(this.formatResponse), catchError((httpError: HttpErrorResponse) => this.handleError(httpError, path)));
  }

  clearCache() {
        this.cacheClearedSubject.next(true);
  }

  setCsrfToken() {
    document.cookie = this.getCsrfToken();
  }

  getCsrfToken() {
    const cookie = this.generateCsrfToken();
    return `CSRF-TOKEN=${cookie}; path=/;`;
  }

  getCacheCleared(): Observable<boolean> {
    return this.cacheClearedSubject.asObservable();
  }

  private buildPath(path) {
    const urlPath = path.startsWith('/') ? path.slice(1) : path;
   // console.log(`${API_BASE_URL}${urlPath}`);
   return `${API_BASE_URL}${urlPath}`;
  }

  /**
   * Recursively traverses the nested object to replace any empty strings
   * with null.
   *
   * NOTE: This was needed for the API, as it will fail validation (min-length=1)
   * if an object value is an empty string.
   * @param obj - Body object to modify
   */
  private formatBodyObject(obj) {
    if (!obj) return;

    Object.keys(obj).forEach(key => {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        obj[key] = this.formatBodyObject(obj[key]);
      } else if (obj[key] === '') {
        obj[key] = null;
      }
    });

    return obj;
  }

  private formatResponse(res: HttpResponse<any>) {
    const { body } = res;

    if (body === null || !(body instanceof Object) || !Object.keys(body).includes('data')) {
      return body;
    } else {
      return body.data;
    }
  }

  private handleError(httpError: HttpErrorResponse, path: string) {
    if (httpError.status === 401) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    }
    //If appointment or order creation is failed then it will show's appropriate message.
    if ((httpError.status === 500 || httpError.status === 400) && ERROR_APPOINTMENT_ORDER_WHITELIST.includes(path)) {
      //Below commented code is display the message what ever we get in error responce, but now our requirement is hardcode the error message.
      // this.snackbarService.showError(this.i18n(httpError.error.errors ? httpError.error.errors[0].detail:httpError.error[0].detail));
      
    }
    

    // Get the "errors" property of the response body if it exists,
    // otherwise get the entire response body.
    const errorResponse = httpError.error.errors || httpError.error;
    let options = { body: errorResponse };
    options = Object.assign({}, this.defaultHttpOptions, options);
    this.http.request<any>('POST', this.buildPath(ERROR_API), options).subscribe(res => {
      console.log('error sent to api :' + res.ok);
    });
    return throwError(errorResponse);
  }

  private generateCsrfToken(seed = null) {
    /* tslint:disable: no-bitwise */
    return seed
      ? (seed ^ ((Math.random() * 16) >> (seed / 4))).toString(16)
      : ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[01]/g, this.generateCsrfToken);
    /* tslint:enable: no-bitwise */
  }
}
