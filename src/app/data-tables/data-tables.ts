import { booleanAttribute, Component, computed, input, signal } from '@angular/core';
import { MetaData } from './model/data-tables';
import { Tables } from './component/tables/tables';
import { Pagination } from './component/pagination/pagination';

@Component({
  selector: 'data-tables',
  standalone: true,
  imports: [Tables, Pagination],
  templateUrl: './data-tables.html',
  styleUrl: './data-tables.scss',
})
export class DataTables<T> {
  metadata = input<MetaData<T>[]>([]);
  list = input<T[]>([]);
  paginationDisabled = input(false, { transform: booleanAttribute });

  currentPage = signal(1);
  rowsOfPage = signal(10); // Changed default to 10

  sortKey = signal<keyof T | null>(null);
  sortDirection = signal<'asc' | 'desc' | null>(null);

  sortedList = computed(() => {
    const list = this.list();
    const key = this.sortKey();
    const dir = this.sortDirection();

    if (!key || !dir) {
      return list;
    }

    return [...list].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      
      if (valA < valB) return dir === 'asc' ? -1 : 1;
      if (valA > valB) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  });

  renderList = computed(() => {
    if (this.paginationDisabled()) {
      return this.sortedList();
    }
    let page = this.currentPage();
    return this.goToPage(page);
  });

  private goToPage(page: number) {
    const start = (page - 1) * this.rowsOfPage();
    const end = page * this.rowsOfPage();
    return this.sortedList().slice(start, end);
  }

  changePage(page: number) {
    this.currentPage.set(page);
  }

  changePageSize(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.rowsOfPage.set(newSize);
    this.currentPage.set(1);
  }

  handleSort(key: keyof T) {
    if (this.sortKey() === key) {
      if (this.sortDirection() === 'asc') {
        this.sortDirection.set('desc');
      } else {
        this.sortKey.set(null);
        this.sortDirection.set(null);
      }
    } else {
      this.sortKey.set(key);
      this.sortDirection.set('asc');
    }
    this.currentPage.set(1); // Reset to first page after sorting
  }
}
