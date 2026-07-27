# Issue: 升級 Angular 版本與全面遷移 SCSS 樣式

- **建立時間**：2026-07-27T10:53:50+08:00
- **完成時間**：2026-07-27T11:02:30+08:00
- **狀態**：已完成 (Completed)

---

## 任務目標 (Objectives)

1. 將專案的核心 Angular 版本升級至最新版本 (**v22.0.8**)。
2. 將全專案剩餘的 `.css` 組件樣式檔全面轉置為 `.scss`。
3. 檢查全專案中的 CSS/SCSS 引用，修復模組解析問題並確保編譯與建置完全正常。

---

## 修改細節 (Implementation Details)

### 1. 套件依賴升級 (Dependencies Upgrade)
更新 [package.json](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/package.json)：
- 核心依賴升級至 Angular 22 (`^22.0.0`)：
  - `@angular/animations`: `^22.0.0`
  - `@angular/common`: `^22.0.0`
  - `@angular/compiler`: `^22.0.0`
  - `@angular/core`: `^22.0.0`
  - `@angular/forms`: `^22.0.0`
  - `@angular/platform-browser`: `^22.0.0`
  - `@angular/platform-browser-dynamic`: `^22.0.0`
  - `@angular/router`: `^22.0.0`
- 開發依賴升級：
  - `@angular-devkit/build-angular`: `^22.0.0`
  - `@angular/cli`: `^22.0.0`
  - `@angular/compiler-cli`: `^22.0.0`
  - `typescript`: `~6.0.0` (適配 Angular 22 與 TS 6 要求)
  - `zone.js`: `~0.15.0`

### 2. SCSS 專案轉換與檔案重命名 (CSS to SCSS Migration)
將專案中所有 9 個 `.css` 組件樣式檔案統一更名為 `.scss`：
1. `src/app/backtest/backtest.component.css` ➔ `backtest.component.scss`
2. `src/app/backtest/strategy/strategy.component.css` ➔ `strategy.component.scss`
3. `src/app/backtest/stratey-big/stratey-big.component.css` ➔ `stratey-big.component.scss`
4. `src/app/components/equity-chart/equity-chart.component.css` ➔ `equity-chart.component.scss`
5. `src/app/components/home/home.component.css` ➔ `home.component.scss`
6. `src/app/components/model-card/model-card.component.css` ➔ `model-card.component.scss`
7. `src/app/components/navbar/navbar.component.css` ➔ `navbar.component.scss`
8. `src/app/components/user-login-form/user-login-form.component.css` ➔ `user-login-form.component.scss`
9. `src/app/components/user-registration-form/user-registration-form.component.css` ➔ `user-registration-form.component.scss`

### 3. 組件 TypeScript Decorator 引用修正 (Component Decorators Update)
更新下列 10 個 TypeScript 組件檔案中的 `styleUrl` / `styleUrls` 參數，使其正確指向 `.scss` 檔案：
- [backtest.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/backtest/backtest.component.ts)
- [strategy.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/backtest/strategy/strategy.component.ts)
- [stratey-big.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/backtest/stratey-big/stratey-big.component.ts)
- [equity-chart.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/components/equity-chart/equity-chart.component.ts)
- [home.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/components/home/home.component.ts)
- [model-card.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/components/model-card/model-card.component.ts)
- [navbar.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/components/navbar/navbar.component.ts)
- [user-login-form.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/components/user-login-form/user-login-form.component.ts)
- [user-registration-form.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/components/user-registration-form/user-registration-form.component.ts)
- [data-grid.component.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/data-grid/data-grid.component.ts)

### 4. 設定檔與服務類別修正 (Configurations & Service Repairs)
- **TypeScript 模組解析**：修改 [tsconfig.json](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/tsconfig.json) 中的 `"moduleResolution"` 為 `"bundler"`，解決 TypeScript 6 軟性棄用警告及 `@angular/common/http` 套件的子路徑解析問題。
- **依賴注入裝飾器**：於 [show-data-detail.service.ts](file:///c:/Users/user/Desktop/workspace/SynapseXWeb/src/app/show-data-details/show-data-detail.service.ts) 為 `StockFakeDataService` 補上 `@Injectable({ providedIn: 'root' })` 宣告。

---

## 驗證結果 (Verification Results)

執行 `npm run build` 指令，編譯與打包順利完成：

```bash
> essentials@0.0.0 build
> ng build

> Building...
√ Building...
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-2HO4HCGH.js      | main          | 423.98 kB |               112.30 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-77U3LB7R.css   | styles        |   1.58 kB |               601 bytes

                      | Initial total | 460.15 kB |               124.23 kB

Application bundle generation complete. [6.117 seconds] - 2026-07-27T02:58:55.060Z
```
