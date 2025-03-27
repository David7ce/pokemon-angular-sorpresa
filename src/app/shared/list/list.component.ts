// shared/list/list.component.ts
import { Component, Input } from '@angular/core';
import { ListItemData } from '../interfaces/list-item-data.interface';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [ListItemComponent],
})
export class ListComponent {
  @Input() titles: string[] = [];
  @Input() data: ListItemData[] = [];
}