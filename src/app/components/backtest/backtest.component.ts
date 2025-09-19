import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelCardComponent, TradingModel } from '../model-card/model-card.component';

@Component({
  selector: 'app-backtest',
  standalone: true,
  imports: [CommonModule, ModelCardComponent],
  templateUrl: './backtest.component.html',
  styleUrl: './backtest.component.css'
})
export class BacktestComponent {
  tradingModels: TradingModel[] = [
    {
      id: 1,
      name: 'Marry-4',
      description: '。',
      imageUrl: 'assets/model-1.png',
      kpis: [
        { label: '年化報酬率', value: '25.8%', icon: 'bi-arrow-up-right-circle' },
        { label: '夏普比率', value: '1.75', icon: 'bi-star-half' },
        { label: '最大回撤', value: '-12.3%', icon: 'bi-graph-down-arrow' }
      ]
    },
    {
      id: 2,
      name: 'Marry-6 Plus',
      description: '採用強化學習演算法，動態調整倉位與風險曝險，適應快速變化的市場環境。',
      imageUrl: 'assets/add.png',
      kpis: [
        { label: '年化報酬率', value: '32.1%', icon: 'bi-arrow-up-right-circle' },
        { label: '夏普比率', value: '2.10', icon: 'bi-star-half' },
        { label: '最大回撤', value: '-9.5%', icon: 'bi-graph-down-arrow' }
      ]
    },
    {
      id: 3,
      name: 'Marry-6 Pro',
      description: '高頻交易模型，利用卷積神經網絡 (CNN) 分析價量模式，執行微秒級套利策略。',
      imageUrl: 'assets/premiere-pro.png',
      kpis: [
        { label: '年化報酬率', value: '18.5%', icon: 'bi-arrow-up-right-circle' },
        { label: '夏普比率', value: '1.42', icon: 'bi-star-half' },
        { label: '最大回撤', value: '-15.8%', icon: 'bi-graph-down-arrow' }
      ]
    }
  ];
}