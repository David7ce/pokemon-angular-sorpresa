import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../shared/interfaces/pokemon.interface';
import { ListItemComponent } from '../listitem/listitem.component';  // Asegúrate de importar ListItemComponent

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],  // Agrega CommonModule y ListItemComponent
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() pokemons: Pokemon[] = [];
  @Output() detailsClick = new EventEmitter<any>();

  titlesTablePokemons: string[] = ['ID', 'Nombre', 'Imagen', 'Movimientos'];
}