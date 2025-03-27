// pages/pokemons/pokemons.component.ts
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
  titles: string[] = ['ID', 'Nombre', 'Imagen', 'ID de Movimiento'];
  pokemonData: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.getPokemons();
    this.pokemons$.subscribe((pokemons) => {
      this.pokemonData = pokemons.map((pokemon) => ({
        ID: pokemon.id,
        Nombre: pokemon.name,
        Imagen: `<img src="${pokemon.imagen}" alt="${pokemon.name}" width="50">`,
        'ID de Movimiento': pokemon.movements[0]
      }));
    });
  }
}