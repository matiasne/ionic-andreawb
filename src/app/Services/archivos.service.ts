import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BaseCrudFirestoreService } from './base-crud-firestore.service';
import { FirestorageService } from './firestorage.service';
import { BehaviorSubject } from 'rxjs';
import { Archivo } from '../models/archivo';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService extends BaseCrudFirestoreService{

  public porcentajeSubject = new BehaviorSubject <any>("");
  public listoSubject = new BehaviorSubject <any>("");
  public borradoSubject = new BehaviorSubject <any>("");
  public finalizado = false;
  private polizaId =""; 

  constructor(
    protected afs: AngularFirestore,
    private firebaseStorage: FirestorageService,
    private toastService:ToastService
  ) { 
    
    super(afs);
    this.listoSubject.next(false);
    this.borradoSubject.next(false);
  }

  setPathArchivos(polizaId){
    this.setPath("polizas/"+polizaId+"/archivos");
    this.polizaId = polizaId;
    console.log(this.path);
  }

  deleteArchivo(itemId,nombreArchivo){

    this.delete(itemId).then(data=>{
      let referencia = this.firebaseStorage.refFile(nombreArchivo);
      referencia.delete().subscribe(data=>{
        console.log(data);        
          this.borradoSubject.next(true);
          this.borradoSubject.next(false);        
      },error=>{
          this.borradoSubject.next(true);
          this.borradoSubject.next(false);
      });
    })    
  }

  upload(archivo,nombre){

    this.finalizado = false;

    let nombreArchivo = nombre+'_'+this.polizaId;

    let referencia = this.firebaseStorage.refFile(nombreArchivo);

    referencia.getDownloadURL().subscribe(data=>{
      this.toastService.mensaje("","ya existe un archivo con ese nombre");
    }, error=>{
      let tarea = this.firebaseStorage.upload(nombreArchivo, archivo);
    
        tarea.then(data=>{

            console.log(data);
            let file = new Archivo();           
            
            referencia.getDownloadURL().subscribe((URL) => {
              file.url = URL;
              file.name = nombre;
              file.format = archivo.type;

              const item = JSON.parse(JSON.stringify(file)); 

              this.add(item).then(data =>{
                console.log(data);
                this.finalizado = true;
                this.porcentajeSubject.next(0);
                this.listoSubject.next(true);
                this.listoSubject.next(false);
              })
            });
        });

        tarea.catch(data=>{
          console.log(data);
        })

        this.firebaseStorage.upload(nombreArchivo, archivo).catch(data=>{
          console.log(data)
        });

        tarea.percentageChanges().subscribe((porcentaje) => {
          let p = Math.round(porcentaje);

          this.porcentajeSubject.next(p);

        });
    });
  }
   
  
}
