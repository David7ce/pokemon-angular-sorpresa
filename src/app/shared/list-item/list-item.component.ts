// shared/list-item/list-item.component.ts
import { Component, Input } from '@angular/core';
import { ListItemData } from '../interfaces/list-item-data.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() data: ListItemData = {};
  @Input() titles: string[] = [];
}