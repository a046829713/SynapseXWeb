import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    signal
} from '@angular/core';
import { DataGridService } from '../../data-grid.service';


@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent<T> {
    paginationData = input.required<readonly T[]>();
    pageSize = input<number>(10);
    currentPage = signal(1);
    totalPages = computed(() => this.dataGridService.totalPages());


    dataGridService = inject(DataGridService);

    constructor() {
        this.dataGridService.connectPageSize(this.pageSize);
        this.dataGridService.connectCurrentPage(this.currentPage);
    }

    readonly pages = computed(() =>
        Array.from(
            { length: this.totalPages() },
            (_, index) => index + 1
        )
    );

    pageRange = computed(() => {
        const start = Math.max(1, this.currentPage() - 2);
        const end = Math.min(this.totalPages(), this.currentPage() + 2);
        let rangeArray = Array.from({ length: end - start + 1 }, (_, index) => start + index);


        if (start == 1) {
            rangeArray.push(4, 5)
        }
        return rangeArray;
    })

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages()) {
            this.currentPage.set(page);
        }
    }

    previousPage(): void {
        this.currentPage.update(page => Math.max(1, page - 1));
    }

    nextPage(): void {
        this.currentPage.update(page =>
            Math.min(this.totalPages(), page + 1)
        );
    }


}

