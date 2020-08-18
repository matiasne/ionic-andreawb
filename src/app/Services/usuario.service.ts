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
      this.authenticationState.next(true);
      this.userSubject.next(JSON.parse(localStorage.getItem('user')));

      this.afs.doc(`users/${this.getUID()}`).snapshotChanges().subscribe(data=>{
        console.log(data.payload.data());
        localStorage.setItem('user',JSON.stringify(data.payload.data()));
        this.authenticationState.next(true); 
        this.userSubject.next(data.payload.data());
      });

    }    
  } 

  add(user:User){    
    
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.id}`);
    const data = JSON.parse(JSON.stringify(user));
    return userRef.set(data, { merge: true }).then(data =>{
      userRef.get().subscribe(snap =>{
        console.log(snap.data())
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
    let user =  JSON.parse(localStorage.getItem('user'));
    return user.rolAdmin;
  }

  isAgent(){
    let user =  JSON.parse(localStorage.getItem('user'));
    return user.rolAgent;
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
