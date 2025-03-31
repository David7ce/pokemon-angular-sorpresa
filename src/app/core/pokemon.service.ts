import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map, Observable } from 'rxjs';
import { Moves } from '../shared/interfaces/moves.interface';
import { Pokemon } from '../shared/interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsCollection = 'pokemons';
  private movesCollection = 'moves';
  private moveCache = new Map<number, string>(); // ✅ Inicializamos correctamente el cache

  constructor(private firebaseService: FirebaseService) {}

  // Obtener todos los Pokémon de la colección
  getPokemons(): Observable<Pokemon[]> {
    return this.firebaseService.getCollection<Pokemon>(this.pokemonsCollection).pipe(
      map((pokemons) =>
        pokemons.map((pokemon) => ({
          ...pokemon,
          moves: pokemon.moves.map((move: any) => move.id) // ✅ Aseguramos que moves sea solo un array de IDs
        }))
      )
    );
  }

  // Obtener todos los movimientos de la colección
  getMoves(): Observable<Moves[]> {
    return this.firebaseService.getCollection<Moves>(this.movesCollection); // ✅ Quitamos el `0`, ya que `getCollection` no requiere un segundo argumento
  }

  // Obtiene el nombre del movimiento a partir de su ID
  async getMoveNameById(moveId: number): Promise<string | null> {
    if (this.moveCache.has(moveId)) {
      return this.moveCache.get(moveId)!;
    }

    try {
      const move = await this.firebaseService.getDocumentById<Moves>(this.movesCollection, moveId.toString());
      const moveName = move ? move.name : 'Desconocido'; // ✅ Se devuelve "Desconocido" si no encuentra el movimiento
      this.moveCache.set(moveId, moveName);
      return moveName;
    } catch (error) {
      console.error(`Error obteniendo movimiento con ID ${moveId}:`, error);
      return 'Error';
    }
  }
}
