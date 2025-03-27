import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input() pokemon: any = {};
  
  viewDetails() {
    console.log('Detalles del Pokémon:', this.pokemon);
  }
}
