import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PokemonService } from '../../core/pokemon.service';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'pokemons.component.html',
  styleUrls: ['pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons!: Observable<any[]>;
  moves!: Observable<any[]>;

  constructor(
    private pokemonService: PokemonService,
  ) { }

  ngOnInit() {
    this.fetchPokemons();
    this.fetchMoves();
  }

  fetchPokemons() {
    this.pokemons = this.pokemonService.getPokemons();
  }

  fetchMoves() {
    this.moves = this.pokemonService.getMoves();
  }
}
