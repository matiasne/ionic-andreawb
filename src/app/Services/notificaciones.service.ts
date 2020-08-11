import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Notificacion } from '../models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  private httpParams = new HttpParams({
      
  })

  private options = {
    headers: this.httpHeaders,
    params: this.httpParams
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  

  private enviarHttp(token,titulo,mensaje){
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': 'key=AAAARtj4-6c:APA91bGXaI69tq_Uhs8rIvUcaOTZkBw7pVgg30FCBJcz4zAu_tOizyzGN61J1e0t4W-oGvxjxPWMMUyW_C7Xnqq0oS2AlkrvbT9VpdagcnXnXhDL80A-kLuXF325hqzg44CnSGUTwUCQ'
    });   
 
    let options = {
      headers: this.httpHeaders
    };  

    let body = {
      "notification": {
          "title": titulo,
          "body": mensaje
      },
      "to": token 
      }

    console.log(body);

    return this.httpClient.post("https://fcm.googleapis.com/fcm/send",body, options) .pipe(
      retry(0),
      catchError(this.handleError)
    );

  }


  // Handle API errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', JSON.parse(error.error.message));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    var mensaje = "Ocurrió un error, por favor intente más tarde";
    if(error.status == 0){
      mensaje = "Error al conectar con el servidor, por favor verifique su conexión a internet";        
    }

    return throwError(mensaje);
  };

  
}
