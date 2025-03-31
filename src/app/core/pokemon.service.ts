import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { Moves } from '../shared/interfaces/moves.interface';
import { Pokemon } from '../shared/interfaces/pokemon.interface';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsCollection = 'pokemons';
  private movesCollection = 'moves';
  moveCache: any;

  constructor(private firebaseService: FirebaseService) { }

  // Obtener todos los pokemons de la colección
  getPokemons(): Observable<Pokemon[]> {
    return this.firebaseService.getCollection(this.pokemonsCollection, 0);
  }

  // Obtener todos los movimientos de la colección
  getMoves(): Observable<Moves[]> {
    return this.firebaseService.getCollection(this.movesCollection, 0);
  }

  // Entra el ID del movimiento y devuelve el nombre del movimiento
  async getMoveName(moveId: number): Promise<string | null> {
    if (this.moveCache.has(moveId)) {
      return this.moveCache.get(moveId)!;
    }

    const move = await this.firebaseService.getDocumentById(this.movesCollection, moveId.toString());
    const moveName = move ? move.name : null;
    this.moveCache.set(moveId, moveName);
    return moveName;
  }
}
