import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BacktestComponent } from './components/backtest/backtest.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // 預設路徑顯示 HomeComponent
    { path: 'home', component: HomeComponent }, // /home 路徑也顯示 HomeComponent
    { path: 'backtest', component: BacktestComponent }, // /backtest 路徑顯示 BacktestComponent
    { path: '**', redirectTo: '', pathMatch: 'full' } // 其他任何路徑都重導向回首頁
];

