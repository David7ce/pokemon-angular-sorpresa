import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { Moves } from '../shared/interfaces/moves.interface';
import { Pokemon } from '../shared/interfaces/pokemon.interface';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private collectionName = 'pokemons';

  constructor(private firebaseService: FirebaseService) {}

  // Obtener todos los Pokémon usando la funcion getCollection de FirebaseService
  getPokemons(): Observable<Pokemon[]> {
    return this.firebaseService.getCollection(this.collectionName);
  }
 
  // Obtener un Pokémon por su ID usando la funcion getDocumentById de FirebaseService
  getPokemonById(id: string): Promise<Pokemon> {
    return this.firebaseService.getDocumentById(this.collectionName, id);
  }

  // Obtener todos los movimientos usando la funcion getCollection de FirebaseService
  getMoves(): Observable<Moves[]> {
    return this.firebaseService.getCollection(this.collectionName);
  }
}
