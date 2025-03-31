import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/pokemon.service';
import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemons',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  showModal: boolean = false;
  titlesTablePokemons: string[] = ['ID', 'Nombre', 'Imagen', 'Movimientos'];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private pokemonService: PokemonService) { }

  viewDetails(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPokemon = null;
  }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        console.log('Pokemons antes de transformar:', data);
        this.pokemons = data.map((pokemon) => ({
          ...pokemon,
          moves: pokemon.moves.map((move: any) => move.id)
        }));
        console.log('Pokemons después de transformar:', this.pokemons);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los Pokémon:', error);
        this.errorMessage = 'Error al cargar los Pokémon.';
        this.isLoading = false;
      }
    });
  }
}