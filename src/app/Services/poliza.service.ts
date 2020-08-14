import { Injectable } from '@angular/core';
import { BaseCRUDService } from './base-crud.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';
import { BaseCrudFirestoreService } from './base-crud-firestore.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class PolizaService extends BaseCrudFirestoreService{
  constructor(
    protected afs: AngularFirestore
  ) { 
    
    super(afs);
    this.setPath("polizas");
  }
}
