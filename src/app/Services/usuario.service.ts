import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  authenticationState = new BehaviorSubject(false);
  public userSubject = new BehaviorSubject <any>("");
  
  constructor(
    private afs: AngularFirestore,
  ) {
    


  }

  checkToken() {  
    if (localStorage.getItem('user')) {         
      console.log("!!!!")
      
      this.afs.doc(`users/${this.getUID()}`).snapshotChanges().subscribe(data=>{
        if(data.payload.data())
          localStorage.setItem('user',JSON.stringify(data.payload.data()));
        this.authenticationState.next(true); 
        this.userSubject.next(data.payload.data());
      });

    }    
  } 

  add(user:User){    
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.id}`);
    const data = JSON.parse(JSON.stringify(user));
    console.log(data);
    return userRef.set(data, { merge: true }).then(data =>{
      userRef.get().subscribe(snap =>{
        if(snap.data())
          localStorage.setItem('user',JSON.stringify(snap.data()));
        this.authenticationState.next(true); 
        this.userSubject.next(snap.data());
      })

    });
  }

  delete(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.authenticationState.next(false);  
  }

  getInfoById(id){
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${id}`);
    return userRef.get(id);
  }

  getActualRef(){
    return this.afs.doc(`users/${this.getUID()}`).ref;
  }

  getActualUserObservable(): Observable<any>{
    return this.userSubject.asObservable();
  }

  isAdmin(){
    
      if(localStorage.getItem('user')){
        let user =  JSON.parse(localStorage.getItem('user'));
        return user.rolAdmin;     
      }
      else{
        return false;
      }

  }

  isAgent(){
  
    if(localStorage.getItem('user')){
      let user =  JSON.parse(localStorage.getItem('user'));
      return user.rolAgente;     
    }
    else{
      return false;
    }
  }

  getUID(){    
    if(localStorage.getItem('user')!= undefined){
      let user =  JSON.parse(localStorage.getItem('user'));
      return user.id;     
    }
    else{
      return false;
    }
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
