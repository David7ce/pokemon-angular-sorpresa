import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore = inject(Firestore); // ✅ Se usa `inject()` para evitar errores de contexto

  getCollection<T>(collectionName: string): Observable<T[]> {
    const colRef = collection(this.firestore, collectionName);
    return collectionData(colRef) as Observable<T[]>; // ✅ Conversión segura de tipo
  }

  async getDocumentById<T>(collectionName: string, docId: string): Promise<T | undefined> {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as T) : undefined; // ✅ Manejo seguro de `undefined`
    } catch (error) {
      console.error(`Error obteniendo documento ${docId} de ${collectionName}:`, error);
      return undefined;
    }
  }
}
