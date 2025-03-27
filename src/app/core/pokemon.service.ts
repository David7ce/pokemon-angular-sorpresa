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

  constructor(private firebaseService: FirebaseService) { }

  // Obtener todos los pokemons de la colección
  getPokemons(): Observable<Pokemon[]> {
    return this.firebaseService.getCollection(this.pokemonsCollection, 0);
  }

  // Obtener todos los movimientos de la colección
  getMoves(): Observable<Moves[]> {
    return this.firebaseService.getCollection(this.movesCollection, 0);
  }

  // TODO: Obtener el nombre del movimiento segun su ID
  async getMoveNameById(moveId: number): Promise<string | null> {
    const move = await this.firebaseService.getDocumentById(this.movesCollection, moveId.toString());
    return move ? move.name : null;
  }
}
