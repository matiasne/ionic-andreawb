import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BaseCrudFirestoreService } from './base-crud-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AgentesService extends BaseCrudFirestoreService{

  constructor(
    protected afs: AngularFirestore
  ) {     
    super(afs);
    this.setPath("users");
  }

  
}