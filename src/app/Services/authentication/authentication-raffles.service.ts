import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Platform, AlertController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { ToastService } from '../toast.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

/*---------------------------------
Responsabilidad: 

-----------------------------------*/

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRafflesService {

  private webClientId= "780247468688-mm58kr3i4nn4peg6rdbhvcdrm6ubbvtp.apps.googleusercontent.com";
  private url = "";

  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  private options = {
    headers: this.httpHeaders
  };

  authenticationState = new BehaviorSubject(false);
  
  constructor(
    public firebaseAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private platform: Platform,
    public alertController: AlertController,
    public googlePlus:GooglePlus,
    private toastService:ToastService,
    private usuarioService:UsuarioService
  ) { 

    this.url = environment.url;
    this.platform.ready().then(() => {
      this.checkToken();
    }); 
  }

  checkToken() {    
    if (localStorage.getItem('token')) {
      this.authenticationState.next(true);
    }    
  } 
  

  public login(_email:string,_password:string){   
    let body = {
      email:_email,
      password:_password
    }	         
		return this.httpClient.post(this.url+"login", body, this.options).subscribe(response =>{
      var resp:any = response;     
      
      let usuario = new User();
      usuario.id = resp.data.user.id;
      usuario.foto = resp.data.user.avatar.thumbnail;
      usuario.email = resp.data.user.email;
      usuario.nombre = resp.data.user.name;
      usuario.token = resp.data.token;
      this.usuarioService.add(usuario); 

    },err=>{
      if(err.status == 0){
        //this.presentAlert("No fue posible conectarnos a nuestros servidores, por favor verifica tu conexión");
        this.toastService.mensaje("","No fue posible conectarnos a nuestros servidores, por favor verifica tu conexión");
      }
      //email: test_user_53751378@testuser.com
      //password: Yobs2020
      console.log(err);
      let mensaje: string = '';
      Object.keys(err.error.errors).forEach((key,index)=> {
        // key: the name of the object key
        // index: the ordinal position of the key within the object 
        this.usuarioService.delete();
        console.log(err.error.errors[key][0])
        mensaje += err.error.errors[key][0] + '\n';
        //this.presentToast(err.error.errors[key][0]);
        //this.presentAlert(err.error.errors[key][0]);
      });
      this.toastService.mensaje("",mensaje);
    })
  }	

  logout() {
    this.usuarioService.delete();  
  }

  
  
  public recuperar(data){
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });  

    let options = {
      headers: this.httpHeaders
    };

    let body= data;   
    

    return this.httpClient.post(this.url+'password-request',body, options)
  }

  public registrar(data){
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json'
    });  

    let options = {
      headers: this.httpHeaders
    };

    let body= data;       

    return this.httpClient.post(this.url+'register',body, options).subscribe(response =>{
      var resp:any = response;
          
      let usuario = new User();
      usuario.id = resp.data.user.id;
    //  usuario.foto = resp.data.user.avatar.thumbnail;
      usuario.email = resp.data.user.email;
      usuario.nombre = resp.data.user.name;
      usuario.token = resp.data.token;
      this.usuarioService.add(usuario); 
    },err=>{
      if(err.status == 0){
        //this.presentAlert("No fue posible conectarnos a nuestros servidores, por favor verifica tu conexión");
        this.toastService.mensaje("","No fue posible conectarnos a nuestros servidores, por favor verifica tu conexión");
      }
      //email: test_user_53751378@testuser.com
      //password: Yobs2020
      console.log(err);
      let mensaje: string = '';
      Object.keys(err.error.errors).forEach((key,index)=> {
        // key: the name of the object key
        // index: the ordinal position of the key within the object 
        //this.authService.authenticationState.next(false);
        console.log(err.error.errors[key][0])
        mensaje += err.error.errors[key][0] + '\n';
        //this.presentToast(err.error.errors[key][0]);
        //this.presentAlert(err.error.errors[key][0]);
      });
      this.toastService.mensaje("",mensaje);
    })
  }


  cambiarContrasena(form: string){
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }); 
    //let parametros = JSON.stringify(form.value);
    //var httpParams = new HttpParams({ }); 
    console.log('cambiarContrasena: '+form);
    let options = {
      headers: this.httpHeaders,
      params: {params: form} //JSON.stringify(form)
    };
    let body = '';   
    //url: 'https://testing.api.yobs.app/v1/',
    return this.httpClient.put(this.url+'account/change-password', body, options);
  }

  async googleSignin() {
    if (this.platform.is('cordova')) {
      let params;
      if (this.platform.is('android')) {
        params = {
          'webClientId': this.webClientId,
          'offline': true,
          'scopes': 'profile email'
        }
      }
      else {
        params = {}
      }

      console.log(params);
      this.googlePlus.login(params).then((response) => {
        const { idToken, accessToken } = response;
        console.log(response); 
        
        var res:any = response;

        this.datosUsuario(res.credential.idToken);
        
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error));
      });
  
     
  
    } else {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.firebaseAuth.auth.signInWithPopup(provider).then(result => {     
        //this.updateUserData(result.user);
        console.log(result);  
        console.log(result.user)

        var res:any = result;
        console.log(res.credential.idToken);
        this.datosUsuario(res.credential.idToken);
       /* this.ngZone.run(() => {
          this.router.navigate(['/mis-datos']);
        });*/
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  }

  datosUsuario(token){

    let body = {
      token:token,
    }	         

		this.httpClient.post(this.url+'auth/google', body, this.options).subscribe(data=>{
      var resp:any = data;
         
          let usuario = new User();
          usuario.id = resp.data.user.id;
          usuario.foto = resp.data.user.avatar.thumbnail;
          usuario.email = resp.data.user.email;
          usuario.nombre = resp.data.user.name;
          usuario.token = resp.data.token;
          this.usuarioService.add(usuario); 
          
    })
  }
  
}