import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/pokemon.service';
import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemons',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  pokemons: any[] = [];
  selectedPokemon: any | null = null;
  showModal: boolean = false;
  titlesTablePokemons: string[] = ['ID', 'Nombre', 'Imagen', 'Movimientos'];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private pokemonService: PokemonService) {}

  viewDetails(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPokemon = null;
  }

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.pokemonService.getPokemons());

      if (!data) {
        throw new Error('No se pudo obtener la lista de Pokémon.');
      }

      this.pokemons = await Promise.all(
        data.map(async (pokemon) => {
          const moveNames = await Promise.all(
            pokemon.moves.map(async (moveId: number) => {
              return (await this.pokemonService.getMoveNameById(moveId)) ?? 'Desconocido'; // ✅ Previene `null`
            })
          );
          return { ...pokemon, moves: moveNames };
        })
      );

      this.isLoading = false;
    } catch (error) {
      console.error('Error al cargar los Pokémon:', error);
      this.errorMessage = 'Error al cargar los Pokémon.';
      this.isLoading = false;
    }
  }
}
