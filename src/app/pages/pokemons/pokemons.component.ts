import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/pokemon.service';
import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemons',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> | undefined;
  titles: string[] = ['ID', 'Nombre', 'Imagen', 'Movimiento'];
  pokemonData: any[] = [];
  showModal: boolean = false;
  selectedPokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) { }

  viewDetails(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPokemon = null;
  }

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.getPokemons();
    this.pokemons$.subscribe(async (pokemons) => {
      this.pokemonData = await Promise.all(
        pokemons.map(async (pokemon) => {
          const movementNames = await Promise.all(
            pokemon.moves.map((moveId: number) =>
              this.pokemonService.getMoveNameById(moveId)
            )
          );
          return {
            'ID': pokemon.id,
            'Nombre': pokemon.name,
            'Imagen': `<img src="${pokemon.image}" alt="${pokemon.name}" width="50">`,
            'Movimiento': movementNames.filter((name) => name !== null).join(', ') // TODO: Mostrar nombre del movimiento
          };
        })
      );
    });
  }
}