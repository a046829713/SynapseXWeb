import { AfterViewInit, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { GridColumn } from '../../model/grid-column.model';
import { DataGridService } from '../../data-grid.service';

@Component({
    selector: 'app-tables',
    standalone: true,
    imports: [NgTemplateOutlet],
    templateUrl: './tables.component.html',
    styleUrl: './tables.component.scss'
})
export class TablesComponent<T> {
    TableData = input.required<readonly T[]>();
    TableColumns = input.required<readonly GridColumn<T>[]>();
    dataGridService = inject(DataGridService);
    sortKey = signal<keyof T | null>(null);
    sortDirection = signal<'asc' | 'desc'>('desc');
    

    constructor() {
        this.dataGridService.connectSortKey(this.sortKey);
        this.dataGridService.connectSortDirection(this.sortDirection);
    }

    getCellValue(
        row: T,
        column: GridColumn<T>
    ): unknown {
        return row[column.field];
    }

    getColumnWidth(column: GridColumn<T>): string {
        return column.width
            ? `${column.width}px`
            : 'auto';
    }



    handleHeaderClick(key: keyof T, event: MouseEvent) {
        this.sortKey.set(key);
        this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    }


    onDragStart(event: DragEvent, index: number) {
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
        
    }

    onDrop(event: DragEvent, index: number) {
        event.preventDefault();

        const fromIndex = Number(
            event.dataTransfer?.getData('text/plain')
        );
        

        this.dataGridService.drogStartIndex.set(fromIndex);
        this.dataGridService.drogEndIndex.set(index);
        console.log("開始欄位3:",this.dataGridService.drogStartIndex())
        console.log('結束欄位4', this.dataGridService.drogEndIndex());
    }
}
