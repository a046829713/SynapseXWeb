import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, TemplateRef, ViewChild, DestroyRef, input } from '@angular/core';
import { DataGridComponent } from '../data-grid/data-grid.component';
import { GridCellContext, GridColumn } from '../data-grid/model/grid-column.model';
import { StockFakeDataService, StockData } from './show-data-detail.service';


interface User {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive';
}

@Component({
    selector: 'app-show-data-details',
    standalone: true,
    imports: [DataGridComponent],
    templateUrl: './show-data-details.component.html',
    styleUrl: './show-data-details.component.scss',
    providers: [StockFakeDataService]
})
export class ShowDataDetailsComponent implements AfterViewInit, OnInit {
    @ViewChild('statusTemplate', { static: false })
    statusTemplate!: TemplateRef<GridCellContext<User>>;
    stockFakeDataService = inject(StockFakeDataService);
    destoryRef = inject(DestroyRef);
    pageNumber = input<number>(1);
    stockData: StockData[] = [];

    ngOnInit(): void {
        const stockSubscription = this.stockFakeDataService.getStockData().subscribe({
            next: (infoData) => {
                this.stockData = infoData;
            },
            error: (error: unknown) => {
                console.error('取得股票資料失敗：', error);
            }
        });



        this.destoryRef.onDestroy(() => {
            stockSubscription.unsubscribe();
        });
    }

    columns: GridColumn<StockData>[] = []
    constructor(private readonly cdr: ChangeDetectorRef) {

    }

    ngAfterViewInit() {
        this.columns = [
            {
                field: 'date',
                header: 'Date',
                width: 120
            },
            {
                field: 'close',
                header: 'ClosePrice',
                width: 120
            },
            {
                field: 'high',
                header: 'HighPrice',
                width: 120
            },
            {
                field: 'low',
                header: 'LowPrice',
                width: 120,
            }
            ,
            {
                field: 'open',
                header: 'OpenPrice',
                width: 120,
            }
            ,
            {
                field: 'volume',
                header: 'Volume',
                width: 120,
            }
        ];

        this.cdr.detectChanges();
    }

}
