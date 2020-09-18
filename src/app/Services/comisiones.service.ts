import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BaseCrudFirestoreService } from './base-crud-firestore.service';
import { FirestorageService } from './firestorage.service';
import { BehaviorSubject } from 'rxjs';
import { Archivo } from '../models/archivo';
import { ToastService } from './toast.service';
import { Comision } from '../models/comision';

@Injectable({
  providedIn: 'root'
})
export class ComisionesService extends BaseCrudFirestoreService{

  public porcentajeSubject = new BehaviorSubject <any>("");
  public listoSubject = new BehaviorSubject <any>("");
  public borradoSubject = new BehaviorSubject <any>("");
  public finalizado = false;


  constructor(
    protected afs: AngularFirestore,
    private firebaseStorage: FirestorageService,
    private toastService:ToastService
  ) { 
    
    super(afs);
    this.listoSubject.next(false);
    this.borradoSubject.next(false);
    this.setPath("comisiones");
    console.log(this.path);
  }


  deleteArchivo(item){

    this.delete(item.id).then(data=>{
      let referencia = this.firebaseStorage.refFile(item.fileName+"_"+item.companiaId);
      referencia.delete().subscribe(data=>{
        console.log(data);        
          this.borradoSubject.next(true);
          this.borradoSubject.next(false);        
      },error=>{
          console.log(error)
          this.borradoSubject.next(true);
          this.borradoSubject.next(false);
      });
    })    
  }

  upload(archivo,nombre,compania){

    console.log(compania);
    this.finalizado = false;
    let nombreArchivo = nombre+'_'+compania.id;
    let referencia = this.firebaseStorage.refFile(nombreArchivo);

    referencia.getDownloadURL().subscribe(data=>{
      this.toastService.mensaje("","ya existe un archivo con ese nombre");
    }, error=>{
      let tarea = this.firebaseStorage.upload(nombreArchivo, archivo);
    
        tarea.then(data=>{
            console.log(data);
            let comision = new Comision();      
            
            referencia.getDownloadURL().subscribe((URL) => {
              comision.url = URL;
              comision.fileName = nombre;
              comision.format = archivo.type;
              comision.companiaId = compania.id;
              comision.companiaNombre = compania.name;
              const item = JSON.parse(JSON.stringify(comision)); 
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