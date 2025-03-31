import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore = inject(Firestore); // ✅ Se usa `inject()` para evitar errores de contexto

  // Esta función obtiene una colección de Firestore y devuelve sus datos como un Observable.
  // El tipo genérico T permite que la función sea reutilizable para diferentes tipos de datos.
  getCollection<T>(collectionName: string): Observable<T[]> {
    const colRef = collection(this.firestore, collectionName);
    return collectionData(colRef) as Observable<T[]>; // ✅ Conversión segura de tipo
  }

  // Esta función obtiene un documento específico de una colección en Firestore
  // y devuelve su contenido como un objeto del tipo especificado por el genérico T.
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
