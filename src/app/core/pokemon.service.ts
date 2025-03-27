import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getPokemons(): Observable<any[]> {
    const pokemonsCollection = collection(this.firestore, 'pokemons');

    console.log(pokemonsCollection);

    return collectionData(pokemonsCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getMoves(): Observable<any[]> {
    const movesCollection = collection(this.firestore, 'movements');

    return collectionData(movesCollection, { idField: 'id' }) as Observable<any[]>;
  }
}
