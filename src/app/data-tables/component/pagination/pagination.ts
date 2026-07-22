import { Component, computed, effect, input, model, output, signal } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination<T> {
  currentPage = input.required<number>();
  limit = model<number>(5);
  list = model<T[]>([]);
  disabled = input<boolean>();

  onChangePage = output<number>();

  pages = computed(() => {
    let listLen = this.list().length;
    let limit = this.limit();
    let pages = Math.ceil(listLen / limit);
    return _.range(pages);
  });

  changePage(page: number) {
    this.onChangePage.emit(page);
  }
}
