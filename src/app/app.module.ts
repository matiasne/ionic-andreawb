import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx'
import { File } from '@ionic-native/file/ngx';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FCM } from '@ionic-native/fcm/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RecortarImagenPage } from './recortar-imagen/recortar-imagen.page';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SeleccionarImagenComponent } from './Components/seleccionar-imagen/seleccionar-imagen.component';
import { ComponentsModule } from './Components/components.module';
import { ItemDirective } from './Components/list-base/item.directive';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const firebaseConfig = {
  apiKey: "AIzaSyAYAbLJnwJPwltC6tC1NaPjryYuIKTB1zM",
  authDomain: "gestionsocialup.firebaseapp.com",
  databaseURL: "https://gestionsocialup.firebaseio.com",
  projectId: "gestionsocialup",
  storageBucket: "gestionsocialup.appspot.com",
  messagingSenderId: "304287906727",
  appId: "1:304287906727:web:b7e9cdb7f3ddd8bf93d482",
  measurementId: "G-PDRLW20SDT"
};

@NgModule({
  declarations: [
    AppComponent,    
    RecortarImagenPage
  ],
  entryComponents: [
   
    RecortarImagenPage,
    
  ],
  imports: [
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxQRCodeModule,
    NgxDatatableModule,   
    HttpClientModule,
    ImageCropperModule,
    IonicModule.forRoot(),
    AppRoutingModule,  
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Crop,
    Camera,
    ImagePicker,
    File,
    FCM,
    AngularFirestore,
    BarcodeScanner,
    CallNumber, 
    EmailComposer,
    SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
