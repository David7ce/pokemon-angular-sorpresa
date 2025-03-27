import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  viewDetails() {
    throw new Error('Method not implemented.');
  }
  @Input() pokemons: any[] = [];
}
