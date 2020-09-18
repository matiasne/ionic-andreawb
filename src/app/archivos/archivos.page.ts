import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestorageService } from '../Services/firestorage.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ToastService } from '../Services/toast.service';
import { LoadingService } from '../Services/loading.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { ArchivosPolizaService } from '../Services/archivos-poliza.service';
import { UploadFilePolizaPage } from '../upload-file-poliza/upload-file-poliza.page';


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.page.html',
  styleUrls: ['./archivos.page.scss'],
})
export class ArchivosPage implements OnInit {

  public Allrows = [];
  public rows =[];
  public palabraFiltro = "";
  public files: NgxFileDropEntry[] = [];
  public porcentaje = 0;

  constructor (
    
    private archivosPolizasService:ArchivosPolizaService,
    private toastService:ToastService,
    private loadingService:LoadingService,
    private alertController:AlertController,
    private modalCtrl:ModalController,
    private navParams:NavParams,
    private modalController:ModalController
  ) {}

  ngOnInit(){

    if(this.navParams.get('id')){
      console.log(this.navParams.get('id'));
      this.archivosPolizasService.setPathArchivos(this.navParams.get('id'));
    }
    else{
      alert("id not found");
      this.modalCtrl.dismiss();
    }   

    this.loadingService.presentLoading();
    this.archivosPolizasService.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      console.log(this.rows)
      this.Allrows.forEach(r =>{
        if(r.createdAt)
          r.createdAt = r.createdAt.toDate();
      })
      this.buscar();
    });

   

    this.archivosPolizasService.borradoSubject.subscribe(data=>{
      this.loadingService.dismissLoading();
      if(data){
        this.toastService.mensaje("","Archivo eliminado")
      }
    })
    
  }

  clickIcono(){
    this.modalCtrl.dismiss();
  }

  onChange(event){
    this.palabraFiltro = event.target.value;
    this.buscar();
  }

  buscar(){ 

    if(this.palabraFiltro != ""){

      var palabra = this.palabraFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      var retorno = false;

      this.rows = [];
      
      this.Allrows.forEach(item => {      
  
        var encontrado = false;
        if(item.name){
          retorno =  (item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }

             
       
        if(encontrado){
          this.rows.push(item);
          return true;
        }

      });   
    }
    else{
      this.rows = this.Allrows;
    }
  }




  

  confirmDelete(item){
    this.loadingService.presentLoading();
    this.archivosPolizasService.deleteArchivo(item,this.navParams.get('id'));
  }

  async delete(item) {
    
    const alert = await this.alertController.create({
      header: 'Esta seguro?',
      message: 'Eliminar archivo:'+item.name+'?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si',
          handler: () => { 
            this.confirmDelete(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async showUpload(){
    const modal = await this.modalController.create({
      component: UploadFilePolizaPage,
    });
    return await modal.present();
  }


}
