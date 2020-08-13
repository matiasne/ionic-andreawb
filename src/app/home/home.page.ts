import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BaseCrudFirestoreService } from '../Services/base-crud-firestore.service';
import { snapshotChanges } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController, //para manejar los modales de seleccion de clientes e inmuebles
    private baseFireStore:BaseCrudFirestoreService
  ) { 
    this.baseFireStore.setPath("clientes");
  }

  ngOnInit() {   

   

   
  }

  

  /*
  async modalInmueble(){
    const modalInmueble = await this.modalCtrl.create({ 	
      component: SelectInmueblePage, 			
      componentProps: { 					
        //datos que viajan al modal en modo clave: valor,					
      } 							
    }); 							
    await modalInmueble.present();
    const {data} = await modalInmueble.onDidDismiss(); 	
    console.log('Retorno del modal Inmueble', data); 	
  }
  */
}
