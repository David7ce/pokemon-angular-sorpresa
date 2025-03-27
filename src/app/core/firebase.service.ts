import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  // private getDataFirestore(): Promise<any> {
  //   const dbFirestore = this.firestore;
  //   const docRef = doc(dbFirestore, 'data/doc');
  //   return getDoc(docRef).then(snapshot => snapshot.exists() ? snapshot.data() : null);
  // }

  // Obtener todos los documentos de una colección
  getCollection(collectionName: string, id: number): Observable<any[]> {
    const ref = collection(this.firestore, collectionName);
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  // Obtener un documento por ID
  async getDocumentById(collectionName: string, id: string): Promise<any> {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  }
}
