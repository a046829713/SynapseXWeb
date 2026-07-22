import { Component, input, output } from '@angular/core';
import { MetaData } from '../../model/data-tables';
import { ResizableDirective } from '../../directive/resizable.directive';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [ResizableDirective],
  templateUrl: './tables.html',
  styleUrl: './tables.scss',
})
export class Tables<T> {
  metadata = input<MetaData<T>[]>([]);
  list = input<T[]>([]);

  sortKey = input<keyof T | null>(null);
  sortDirection = input<'asc' | 'desc' | null>(null);
  onSort = output<keyof T>();

  draggedIndex: number | null = null;
  dragOverIndex: number | null = null;

  handleHeaderClick(key: keyof T, event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('resizer')) {
      return;
    }
    this.onSort.emit(key);
  }

  onDragStart(event: DragEvent, index: number) {
    this.draggedIndex = index;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', index.toString());
    }
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    if (this.draggedIndex !== null && this.draggedIndex !== index) {
      this.dragOverIndex = index;
    }
  }

  onDragLeave(event: DragEvent, index: number) {
    if (this.dragOverIndex === index) {
      this.dragOverIndex = null;
    }
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOverIndex = null;
    
    if (this.draggedIndex !== null && this.draggedIndex !== index) {
      const metadataArray = this.metadata();
      const draggedItem = metadataArray[this.draggedIndex];
      
      metadataArray.splice(this.draggedIndex, 1);
      metadataArray.splice(index, 0, draggedItem);
    }
    this.draggedIndex = null;
  }

  onDragEnd(event: DragEvent) {
    this.draggedIndex = null;
    this.dragOverIndex = null;
  }
}
