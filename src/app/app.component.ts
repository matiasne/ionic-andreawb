import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationFirebaseService } from './Services/authentication/authentication-firebase.service';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { NotificacionesDesktopService } from './Services/notificaciones-desktop.service';
import { NotificacionesService } from './Services/notificaciones.service';
import { ToastService } from './Services/toast.service';
import { UsuarioService } from './Services/usuario.service';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;


  public comercioSeleccionado ="";
  public usuario:User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authFirebaseService:AuthenticationFirebaseService,
    private toastService:ToastService,
    private router: Router,
    private fcm: FCM,
    public toastController: ToastController,
    private notifiacionesDesktopService:NotificacionesDesktopService,
    private usuarioService:UsuarioService
  ) {

   
    this.initializeApp();    
    

   
  }

  

  initializeApp() {

    this.usuarioService.getActualUserObservable().subscribe(user =>{
      if(user)
        this.usuario = user;
      else
        this.usuario = new User();
    })

    //console.log("NgOnInit")
    this.notifiacionesDesktopService.init().then(data=>{
      console.log("OK")
    },error=>{
      console.log("ERROR");
    });

    this.platform.ready().then(() => {     

      this.usuarioService.checkToken();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      

      this.usuarioService.authenticationState.subscribe(state => {
      
        if (state) {
                   
        //  this.router.navigate(['/home']);     

          if (this.platform.is('cordova')) {
            this.fcm.subscribeToTopic('general');
        
            this.fcm.getToken().then(token => {     
              this.authFirebaseService.setFCMToken(token);
            },error=>{
              console.log(error)
            });
        
            this.fcm.onTokenRefresh().subscribe(token => {      
              this.authFirebaseService.setFCMToken(token);
            },error=>{
              console.log(error) 
            });     
        
            this.fcm.onNotification().subscribe(data => {
              if(data.wasTapped){
                this.toastService.mensaje("Alerta Recibida","Recibida in background");
              } else {
                this.toastService.mensaje("Alerta Recibida","Received in foreground");
              };
            });
          }       
          else{
            this.notifiacionesDesktopService.requestPermission();
          }
        } else {
          this.router.navigate(['login']);
        }

       
      });

    });
  }

  ngOnInit() {
    
  }

  cerrarSesion(){
    this.authFirebaseService.logout();
  }
}
