import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../shared/interfaces/pokemon.interface';

@Component({
  selector: 'app-listitem',
  standalone: true,
  imports: [CommonModule],  // Agrega CommonModule
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.scss']
})
export class ListItemComponent {
  @Input() pokemon!: Pokemon;  // Recibe el pokemon desde el componente padre
  @Output() detailsClick = new EventEmitter<Pokemon>();  // Emite el pokemon cuando se hace clic en "Ver detalles"

  onViewDetails(): void {
    this.detailsClick.emit(this.pokemon);  // Emite el pokemon al componente padre
  }
}
