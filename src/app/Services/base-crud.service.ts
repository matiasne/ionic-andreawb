import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { ToastService } from './toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseCRUDService {

  public url = "";
  private endpoint = "";

  private httpHeaders:HttpHeaders;

 

  private httpParams = new HttpParams({
      
  })

  private options = {
    headers: this.httpHeaders,
    params: this.httpParams
  }; 
  
  constructor(
    public httpClient: HttpClient,
    public usuarioService:UsuarioService,
    public toastService:ToastService
  ) {
    this.url = environment.url;
  } 

  setEndpoint(endpoint){
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.usuarioService.getToken()
    });
    this.options = {
      headers: this.httpHeaders,
      params: this.httpParams
    };
    this.endpoint = endpoint;
  }

  getEndpoint(){
    return this.url+this.endpoint;
  }

  create(data){
    return this.httpClient.post(this.getEndpoint(),data, this.options) .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  get(id){
    return this.httpClient.post(this.getEndpoint()+"/"+id, this.options) .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  all(page){      
    
    this.httpParams = new HttpParams()
    .set('perPage', "5") 
    .set('page', page)

    this.options = {
      headers: this.httpHeaders,
      params: this.httpParams   
    };  

    console.log(this.options);
    return this.httpClient.get(this.getEndpoint(), this.options) .pipe(
      retry(0),
      catchError(this.handleError)
    );
  }

  update(data){
    return this.httpClient.put(this.url+'account/change-password', data, this.options);
  }

  delete(id){
    return this.httpClient.delete(this.getEndpoint()+"/"+id, this.options).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', JSON.parse(error.error.message));
      alert(error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
   
    console.log(error);
    let mensaje: string = '';
    if(error.status != 0){
      Object.keys(error.error.errors).forEach((key,index)=> {
        console.log(error.error.errors[key][0])
        mensaje += error.error.errors[key][0] + '\n';
      });
      this.toastService.mensaje("",mensaje);
    } 

    return throwError(mensaje);
  };
}