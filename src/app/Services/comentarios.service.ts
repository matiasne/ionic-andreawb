import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastService } from './toast.service';
import { BaseCrudFirestoreService } from './base-crud-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService extends BaseCrudFirestoreService{

  constructor(
    protected afs: AngularFirestore,
    private toastService:ToastService
  ) {     
    super(afs);
  }

  setPathArchivos(polizaId){
    this.setPath("polizas/"+polizaId+"/comentarios");
    console.log(this.path);
  }
}
