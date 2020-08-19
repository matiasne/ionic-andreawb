import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestorageService } from '../Services/firestorage.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ArchivosService } from '../Services/archivos.service';
import { ToastService } from '../Services/toast.service';
import { LoadingService } from '../Services/loading.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';


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
    
    private archivosService:ArchivosService,
    private toastService:ToastService,
    private loadingService:LoadingService,
    private alertController:AlertController,
    private modalCtrl:ModalController,
    private navParams:NavParams,
  ) {}

  ngOnInit(){

    if(this.navParams.get('id')){
      console.log(this.navParams.get('id'));
      this.archivosService.setPathArchivos(this.navParams.get('id'));
    }
    else{
      alert("id not found");
      this.modalCtrl.dismiss();
    }
    

    this.loadingService.presentLoading();
    this.archivosService.list().subscribe(snapshot =>{
      this.Allrows = snapshot;
      console.log(this.rows)
      this.Allrows.forEach(r =>{
        if(r.createdAt)
          r.createdAt = r.createdAt.toDate();
      })
      this.buscar();
    });

    this.archivosService.porcentajeSubject.subscribe(data=>{      
      this.porcentaje = data;
    })

    this.archivosService.listoSubject.subscribe(data=>{
      this.loadingService.dismissLoading();
      if(data){
        this.toastService.mensaje("","Archivo Subido")
      }
    })

    this.archivosService.borradoSubject.subscribe(data=>{
      this.loadingService.dismissLoading();
      if(data){
        this.toastService.mensaje("","Archivo eliminado")
      }
    })
    
  }

  clickIcono(){
    this.modalCtrl.dismiss();
  }

  buscar(){ 

    if(this.palabraFiltro != ""){

      var palabra = this.palabraFiltro.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      var retorno = false;

      this.rows = [];
      
      this.Allrows.forEach(item => {      
  
        var encontrado = false;
        if(item.firstName){
          retorno =  (item.firstName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
          if(retorno)
            encontrado = true;
        }

        if(item.LastName){
          retorno =  (item.LastName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(palabra.toLowerCase()) > -1);
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


  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';


  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    
    this.datosFormulario.delete('archivo');
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;  
        
        console.log(event.target.files[i].name) 

        console.log(event.target.files[i])     
            
        this.archivosService.upload(event.target.files[i], event.target.files[i].name);
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }    
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    console.log("subiendo archivo");
    let archivo = this.datosFormulario.get('archivo');    
    this.archivosService.upload(archivo,this.nombreArchivo);    
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          console.log(droppedFile.relativePath);
          // Here you can access the real file
          console.log(file);
 
          this.archivosService.upload(file,droppedFile.relativePath);
          
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  confirmDelete(item){
    this.loadingService.presentLoading();
    this.archivosService.deleteArchivo(item.id,item.name);
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


}
