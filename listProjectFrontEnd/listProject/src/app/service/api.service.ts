import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,map } from 'rxjs';
import { Character } from 'src/models/Character';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL= environment.API_URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(public http: HttpClient) { }






  //Crea Personaggio

  createCharacter(data:Character): Observable<any> {
      let url= `${this.API_URL}/create`
      return this.http.post(url,data)
      .pipe(
      catchError(this.errorMgmt)
      )
  }


    // Prelevare tutti i personaggi
    getCharacters() {
      return this.http.get(`${this.API_URL}`);
    }


  // Prelevare Personaggio
  getCharacter(id): Observable<any> {
    let url = `${this.API_URL}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res) => {        //Applica una determinata funzione di progetto a ogni valore emesso dall'Osservabile sorgente ed emette i valori risultanti come Osservabile
        return res || {}
      }),
   
      catchError(this.errorMgmt)
    )
  }

    // Aggiornare gli studenti
    updateStudent(id, data:Character): Observable<any> {
      let url = `${this.API_URL}/update/${id}`;
      return this.http.put(url, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
      )
    }

      // Eliminare gli studenti
    deleteStudent(id): Observable<any> {
    let url = `${this.API_URL}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  




    // Gestione errori
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Errore Client-side
        errorMessage = error.error.message;
      } else {
        // Errore server-side
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
