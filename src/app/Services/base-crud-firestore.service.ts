import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudFirestoreService {

  protected collection: AngularFirestoreCollection;

  public path:string ="";
  
  constructor(
      protected afs: AngularFirestore
      ) {
    
  }

  public setPath(path){
    this.path = path;
    this.collection = this.afs.collection(path);
  }

  get(identifier: string) {
    console.log('[BaseService] get: ${identifier}');

    return this.collection
        .doc(identifier)
        .snapshotChanges()
        .pipe(
            map(doc => {
                if (doc.payload.exists) {
		    /* workaround until spread works with generic types */
                    const data = doc.payload.data() as any;
                    const id = doc.payload.id;
                    return { id, ...data };
                }
            })
        );
  }

  getRef(id){
    return this.collection.doc(id).ref;
  }


  list() {
      console.log('[BaseService] list');    

      return this.collection
          .snapshotChanges()
          .pipe(
              map(changes => {
                  return changes.map(a => {
                      const data = a.payload.doc.data();
                      data.id = a.payload.doc.id;
                      data.fromCache = a.payload.doc.metadata.fromCache;
                      return data;
                  });
              })
          );          
    }

    search(palabra,ordenBy,ultimo){
        console.log(ultimo);
        if(ultimo == ""){
            console.log("!!!!!! primero")
            return this.afs.collection(this.path, ref => 
                ref.where('keywords','array-contains',palabra)
                    .orderBy(ordenBy)
                    .limit(5)).snapshotChanges().pipe(
                        map(changes => {
                            return changes.map(a => {
                                const data:any = a.payload.doc.data();
                                data.id = a.payload.doc.id;
                                return data;
                            });
                        })
                    );   
        }
        else{
            return this.afs.collection(this.path, ref => 
                ref.where('keywords','array-contains',palabra)
                    .orderBy(ordenBy)
                    .startAfter(ultimo)
                    .limit(5)).snapshotChanges().pipe(
                        map(changes => {
                            return changes.map(a => {
                                const data:any = a.payload.doc.data();
                                data.id = a.payload.doc.id;
                                return data;
                            });
                        })
                    );       
        }
    }

    add(item) {

      delete item.id;

      

      console.log('[BaseService] adding item'+this.path);
  
      const promise = new Promise((resolve, reject) => {
          this.collection.add(item).then(ref => {
              const newItem = {
                  id: ref.id,
                  /* workaround until spread works with generic types */
                  ...(item as any)
              };
              resolve(newItem);
          });
      });
      return promise;
  }
  
  
  update(data) {

      console.log(`[BaseService] updating item ${data.id}`);
  
      const promise = new Promise((resolve, reject) => {
      const docRef = this.collection
          .doc(data.id)
          .set(data)
          .then(() => {
              resolve({
                  ...(data as any)
              });
          });
      });
      return promise;
  }
  
  delete(id: string): void {
      console.log(`[BaseService] deleting item ${id}`);
  
      const docRef = this.collection.doc(id);
      docRef.delete();
  }
}

