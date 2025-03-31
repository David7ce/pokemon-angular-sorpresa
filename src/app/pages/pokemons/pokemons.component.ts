import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/pokemon.service';
import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { ListComponent } from '../../shared/list/list.component';  // Asegúrate de importar ListComponent

@Component({
  selector: 'app-pokemons',
  imports: [CommonModule, ListComponent],  // Declara todos los componentes en imports
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

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        console.log('Pokemons obtenidos:', data);
        this.pokemons = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los Pokémon:', error);
        this.errorMessage = 'Error al cargar los Pokémon.';
        this.isLoading = false;
      }
    });
  }

  onViewDetails(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPokemon = null;
  }
}
