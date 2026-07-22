import { Component, input, computed, OnInit, inject, signal, effect, Signal } from '@angular/core';
import { GridColumn } from './model/grid-column.model';
import { TablesComponent } from './components/tables/tables.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DataGridService } from './data-grid.service';


@Component({
    selector: 'app-data-grid',
    standalone: true,
    imports: [TablesComponent, PaginationComponent],
    templateUrl: './data-grid.component.html',
    styleUrl: './data-grid.component.css',
    providers: [DataGridService]
})
export class DataGridComponent<T> {
    data = input.required<T[]>();
    columns = input.required<GridColumn<T>[]>();
    dataGridService = inject(DataGridService);
    pageSize = input<number>(10);

    readonly viewData: Signal<T[]> = this.dataGridService.viewData;
    readonly viewColumns: Signal<GridColumn<T>[]> = this.dataGridService.viewColumns;

    constructor() {
        this.dataGridService.connectData(this.data);
        
        
        effect(() => {
            this.dataGridService.connectColumns(this.columns());
        });
    }



}
