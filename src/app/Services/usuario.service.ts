import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  authenticationState = new BehaviorSubject(false);
  public userSubject = new BehaviorSubject <any>("");
  
  constructor() { }

  checkToken() {    
    if (localStorage.getItem('user')) {      
      this.authenticationState.next(true);
      this.userSubject.next(JSON.parse(localStorage.getItem('user')));
    }    
  } 

  add(user:User){    
    localStorage.setItem('user',JSON.stringify(user));
    this.authenticationState.next(true); 
    this.userSubject.next(user);
  }

  delete(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.authenticationState.next(false);  
  }

  getActualUserObservable(): Observable<any>{
    return this.userSubject.asObservable();
  }

  getUID(){    
    let user =  JSON.parse(localStorage.getItem('user'));
    return user.id;
  }

  getNombre(){    
    let user =  JSON.parse(localStorage.getItem('user'));
    return user.nombre;
  }

  getToken(){    
    let user =  JSON.parse(localStorage.getItem('user'));
    console.log(user.token)
    return user.token;
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
  
  get(id: string){
    
  }
}
