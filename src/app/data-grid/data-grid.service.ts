import {
    computed,
    Injectable,
    Signal,
    signal
} from '@angular/core';
import { GridColumn } from './model/grid-column.model';

@Injectable()
export class DataGridService<T> {
    private dataSource: Signal<T[]> = signal<T[]>([]);
    private columns = signal<GridColumn<T>[]>([]);


    private pageSize: Signal<number> = signal<number>(20);
    public currentPage: Signal<number> = signal(1);
    sortKey: Signal<keyof T | null> = signal(null);
    sortDirection: Signal<'asc' | 'desc' | null> = signal(null);

    drogStartIndex = signal(0);
    drogEndIndex = signal(0);


    connectData(data: Signal<T[]>): void {
        this.dataSource = data;
    }

    connectPageSize(size: Signal<number>): void {
        this.pageSize = size;
    }

    connectCurrentPage(CurrentPage: Signal<number>): void {
        this.currentPage = CurrentPage;
    }

    connectSortKey(sortKey: Signal<keyof T | null>): void {
        this.sortKey = sortKey;
    }

    connectSortDirection(sortDirection: Signal<'asc' | 'desc' | null>): void {
        this.sortDirection = sortDirection;
    }

    connectColumns(columns: GridColumn<T>[]) {
        this.columns.set(columns);
    }



    sortData: Signal<T[]> = computed(() => {
        const list = this.dataSource();
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
    })


    viewData: Signal<T[]> = computed(() => {
        const startIndex = (this.currentPage() - 1) * this.pageSize();
        const endIndex = startIndex + this.pageSize();

        if (this.sortKey() === null) {
            return this.dataSource().filter((_, index) => {
                return index >= startIndex && index < endIndex;
            });
        } else {
            return this.sortData().filter((_, index) => {
                return index >= startIndex && index < endIndex;
            });
        }
    });



    viewColumns: Signal<GridColumn<T>[]> = computed(() => {
        const start = this.drogStartIndex();
        const end = this.drogEndIndex();

        if (
            start >= 0 &&
            end >= 0 &&
            start !== end &&
            (start !== 0 || end !== 0)
        ) {
            const endColumn = [...this.columns()].splice(end, 1);
            const startColumn = [...this.columns()].splice(start, 1);

            this.columns.update((columns) => {
                console.log(endColumn);

                columns.splice(start, 0, endColumn[0]);
                columns.splice(end, 0, startColumn[0]);
                return columns;
            });

            

        }

        return this.columns();
    });

    totalPages = computed(() => {
        return Math.ceil(this.dataSource().length / this.pageSize());
    });



}