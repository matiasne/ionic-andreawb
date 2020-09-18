import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { ToastService } from '../toast.service';
import { UsuarioService } from '../usuario.service';
import { User } from 'src/app/models/user';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationFirebaseService {

  //private webClientId= "707543111222-rc4hi4fq35ngvunrspk56o10822sbv9l.apps.googleusercontent.com";
  
  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  private options = {
    headers: this.httpHeaders
  };

  authenticationState = new BehaviorSubject(false);

  public userSubject = new BehaviorSubject <any>("");

  
  constructor(
    public firebaseAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private platform: Platform,
    public alertController: AlertController,
    public googlePlus:GooglePlus,
    private ngZone:NgZone,
    private router: Router,
    private toastService:ToastService,
    private afs: AngularFirestore,
    private usuarioService:UsuarioService,
    private loadingService:LoadingService
  ) { 

    
  }

  

  
  

  login(email: string, password: string) {
    
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');    
        
        console.log(value.user);
        
        let usuario = new User();
        usuario.id = value.user.uid;
        usuario.foto = value.user.photoURL;
        usuario.email = value.user.email;
        usuario.nombre = value.user.displayName;
        this.usuarioService.add(usuario);  

        return true;           
      })
      .catch(async err => {
       
        console.log('Something went wrong:',err.message);

        if(err.message ==  "The email address is badly formatted."){
         /* this.toastr.info('El Email ingresado no tiene un formato valido','Error al ingresar Email', {
            timeOut: 5000,
          });*/ 
         this.toastService.mensaje("",'El Email ingresado no tiene un formato valido');
         
          
          return false;
        }

        if(err.message ==  "The password is invalid or the user does not have a password."){
         /* this.toastr.info('El password ingresado no es correcto','Password Incorrecto', {
            timeOut: 5000,
          });*/
         this.toastService.mensaje("",'El password ingresado no es correcto');
         
          return false
        }

        if(err.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
          /*this.toastr.info('El usuario ingresado no existe','Usuario no encontrado', {
            timeOut: 5000,
          });*/
         this.toastService.mensaje("",'El usuario ingresado no existe');
          
          return false
        }
       
    });
  }

  resetPassword(email: string) {
    var auth = this.firebaseAuth.auth;
    return auth.sendPasswordResetEmail(email)
      .then(async () => {
       
        this.toastService.mensaje("",'Te hemos enviado un mail para que puedas reiniciar tu password');
        this.router.navigate(['/login']);
      })
      .catch(async (error) => {
        console.log(error.message);

        
        

        if(error.message ==  "The email address is badly formatted."){
          
         this.toastService.mensaje("",'El Email ingresado no tiene un formato valido');
        }

        if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
         
         this.toastService.mensaje("",'El Email ingresado no se encuentra registrado');
        }

      })
  }

  setFCMToken(token){
    console.log(token);
  }

  


  signup(data) {
    
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {                   
        this.ngZone.run(async () => {          
          console.log(result.user);
        
          let usuario = new User();
          usuario.id = result.user.uid;
          usuario.foto = result.user.photoURL;
          usuario.email = result.user.email;
          usuario.nombre = data.firstName+" "+data.lastName;

          this.usuarioService.add(usuario);  

         this.toastService.mensaje("",'Usuario creador correctamente. Bienvenido!');
        });

      }).catch(async (error) => {
       console.log(error.message);

       if(error.message ==  "The email address is already in use by another account."){          
        this.toastService.mensaje("",'El mail ingresado ya se encuentra registrado');        
       }

        if(error.message ==  "Password should be at least 6 characters"){          
         this.toastService.mensaje("",'La contraseña debe contener al menos 6 caracteres');
        }

        if(error.message ==  "The email address is badly formatted."){         
         this.toastService.mensaje("",'El Email ingresado no tiene un formato valido');
        }
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification()
    .then(async () => {
     
      this.toastService.mensaje("",'Te hemos enviado un mail para que verifiques tu correo');
      
    })
  }

  logout() {
    this.usuarioService.delete();  
  } 

 

  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.firebaseAuth.auth.signInWithCredential(credential)
      .then((response) => {

        console.log(response.user);
        
        let usuario = new User();
        usuario.id = response.user.uid;
        usuario.foto = response.user.photoURL;
        usuario.email = response.user.email;
        usuario.nombre = response.user.displayName;
        this.usuarioService.add(usuario);      
      }) 
  }  

  async googleSignin() {
    this.loadingService.presentLoading();
    if (this.platform.is('cordova')) {
      let params;
      if (this.platform.is('android')) {
        params = {
          'webClientId': environment.webClientId,
          'offline': true,
          'scopes': 'profile email'
        }
      }
      else {
        params = {}
      }

      console.log(params);
     
      this.googlePlus.login(params).then((response) => {
        const { idToken, accessToken } = response
        console.log(response);       
        this.onLoginSuccess(idToken, accessToken);
        this.loadingService.dismissLoading();
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error));
        this.loadingService.dismissLoading();
      });
  
     
  
    } else {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.firebaseAuth.auth.signInWithPopup(provider).then(result => {   
        
        console.log(result.user);
        
        let usuario = new User();
        usuario.id = result.user.uid;
        usuario.foto = result.user.photoURL;
        usuario.email = result.user.email;
        usuario.nombre = result.user.displayName;
        this.usuarioService.add(usuario);  
        this.loadingService.dismissLoading();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        this.loadingService.dismissLoading();
      });
    }
  }

 

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //console.error(`Backend returned code ${error.status}, ` +`body was: ${error.error.errors[0]}`);

      console.log(error.error.errors.date_of_birth[0]);
      //this.presentAlert(error.error.errors.date_of_birth[0]);      

    }
    // return an observable with a user-facing error message
    
    var mensaje = "Ocurrió un error, por favor intente más tarde";
    if(error.status == 0){
      mensaje = "Error al conectar con el servidor, por favor verifique su conexión a internet";        
    }
    return throwError(mensaje);
  };

  async presentAlert(message) {

    const alert = await this.alertController.create({
      header: 'Completar Campos',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

