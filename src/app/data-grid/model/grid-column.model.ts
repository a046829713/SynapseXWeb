import { TemplateRef } from '@angular/core';

export interface GridColumn<T> {
    /**
     * 對應資料物件的屬性。
     */
    field: keyof T;

    /**
     * 顯示在 Header 的文字。
     */
    header: string;

    /**
     * 欄位寬度，例如 120、240。
     */
    width?: number;

    /**
     * 最小寬度。
     */
    minWidth?: number;

    /**
     * 自訂儲存格 Template，之後可以顯示按鈕、Chip 等內容。
     */
    cellTemplate?: TemplateRef<GridCellContext<T>>;
}

export interface GridCellContext<T> {
    $implicit: T;
    row: T;
    value: unknown;
}