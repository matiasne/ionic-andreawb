import { Injectable } from '@angular/core';
import { BaseCrudFirestoreService } from './base-crud-firestore.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService extends BaseCrudFirestoreService{

  constructor(
    protected afs: AngularFirestore
  ) { 
    
    super(afs);
    this.setPath("companias");
  }

}
