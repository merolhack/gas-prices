import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// Import the models
import { State, Municipality } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  apiHost = 'https://gas-prices-back.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getStates(): Observable<State> {
    return this.httpClient.get<State>(`${this.apiHost}/states`)
      .pipe(
        retry(5),
        catchError(this.handleError)
      );
  }

  getMunicipalities(stateId = '01') {
    return this.httpClient.get(`${this.apiHost}/municipalities/${stateId}`)
      .pipe(
        retry(5),
        catchError(this.handleError)
      );
  }

  getGasPrices() {
    return this.httpClient.get(`${this.apiHost}/gas-prices`)
      .pipe(
        retry(5),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    console.log('error', error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
