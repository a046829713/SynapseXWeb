import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';


export interface StockData {
    date: string;
    close: number;
    high: number;
    low: number;
    open: number;
    volume: number;
}


export interface PageResult<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}


@Injectable()
export class StockFakeDataService {
    stockData: StockData[] = [];
    errorMessage = '';

    constructor(private readonly http: HttpClient) { }

    readCsvFile(
        filePath: string
    ): Observable<StockData[]> {
        return this.http
            .get(filePath, { responseType: 'text' })
            .pipe(
                map((csvText: string) => this.parseStockCsv(csvText))
            );
    }

    private parseStockCsv(csvText: string): StockData[] {
        const rows = csvText
            .replace(/^\uFEFF/, '')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line !== '')
            .map((line) =>
                line.split(',').map((value) => value.trim())
            );

        if (rows.length <= 3) {
            return [];
        }

        return rows.slice(3).map((row, index) => {
            if (row.length < 6) {
                throw new Error(
                    `CSV 第 ${index + 4} 列欄位不足`
                );
            }

            return {
                date: row[0],
                close: this.toNumber(row[1], 'Close', index + 4),
                high: this.toNumber(row[2], 'High', index + 4),
                low: this.toNumber(row[3], 'Low', index + 4),
                open: this.toNumber(row[4], 'Open', index + 4),
                volume: this.toNumber(row[5], 'Volume', index + 4)
            };
        });
    }

    private toNumber(
        value: string,
        columnName: string,
        lineNumber: number
    ): number {
        const result = Number(value);

        if (!Number.isFinite(result)) {
            throw new Error(
                `CSV 第 ${lineNumber} 列的 ${columnName} 不是有效數字`
            );
        }

        return result;
    }



    getStockData(): Observable<StockData[]> {
        return this.readCsvFile('/assets/data/btc-usd.csv').pipe(
            tap((data: StockData[]) => {
                this.stockData = data;
            }),
            catchError((error: unknown) => {
                this.errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'CSV 讀取失敗';

                return throwError(() => new Error(this.errorMessage));
            })
        );
    }



    getStockDataPage(
        page: number,
        pageSize: number
    ): Observable<PageResult<StockData>> {
        console.log('getStockDataPage');

        return this.getStockData().pipe(
            tap((data) => console.log('取得股票資料：', data)),
            map((data) => {
                const safePageSize = Math.max(1, pageSize);
                const totalItems = data.length;

                const totalPages = Math.max(
                    1,
                    Math.ceil(totalItems / safePageSize)
                );

                console.log("總頁數:", totalPages);

                const safePage = Math.min(
                    Math.max(1, page),
                    totalPages
                );

                const startIndex =
                    (safePage - 1) * safePageSize;

                return {
                    items: data.slice(
                        startIndex,
                        startIndex + safePageSize
                    ),
                    page: safePage,
                    pageSize: safePageSize,
                    totalItems,
                    totalPages
                };
            })
        );
    }




    getTotalPage(pageSize: number) {
        if (this.stockData) {

        }

        this.getStockData().pipe(
            map((data) => {
                const safePageSize = Math.max(1, pageSize);
                const totalItems = data.length;
                const totalPages = Math.max(
                    1,
                    Math.ceil(totalItems / safePageSize)
                );
            })
        )

        return 0
    }
}


