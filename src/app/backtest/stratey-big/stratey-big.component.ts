import { Component } from '@angular/core';

@Component({
  selector: 'app-stratey-big',
  standalone: true,
  imports: [],
  templateUrl: './stratey-big.component.html',
  styleUrl: './stratey-big.component.css'
})
export class StrateyBigComponent {
  readonly query = signal('');
  readonly compact = signal(false);
  readonly showSensitive = signal(true);
  readonly copied = signal(false);


  readonly groups: StrategyInfoItem['group'][] = ['基本資料', '運行狀態', '績效指標'];


  readonly items: StrategyInfoItem[] = [
    { label: '策略名稱', value: 'Meta-300k', icon: 'bi-diagram-3', group: '基本資料' },
    { label: '模型名稱', value: 'Mamba2', icon: 'bi-cpu', group: '基本資料' },
    { label: '策略版本', value: 'v2.4.1', icon: 'bi-git', group: '基本資料' },
    { label: '交易市場', value: '台灣期貨', icon: 'bi-globe2', group: '基本資料' },
    { label: '交易商品', value: 'TXF 台指期', icon: 'bi-bar-chart', group: '基本資料' },
    { label: '策略狀態', value: '運行中', icon: 'bi-broadcast', group: '運行狀態', type: 'status' },
    { label: '目前部位', value: '多單 2 口', icon: 'bi-layers', group: '運行狀態' },
    { label: '今日訊號', value: '3 次', icon: 'bi-lightning-charge', group: '運行狀態' },
    { label: '最後更新', value: '2026/07/14 13:58', icon: 'bi-clock-history', group: '運行狀態' },
    { label: '運行時間', value: '18 天 07:42:16', icon: 'bi-stopwatch', group: '運行狀態' },
    { label: '已平倉損益', value: '+24,505', icon: 'bi-cash-stack', group: '績效指標', type: 'profit', sensitive: true },
    { label: '未平倉損益', value: '+3,280', icon: 'bi-graph-up-arrow', group: '績效指標', type: 'profit', sensitive: true },
    { label: '今日損益', value: '-1,250', icon: 'bi-activity', group: '績效指標', type: 'loss', sensitive: true },
    { label: '累積報酬率', value: '+18.42%', icon: 'bi-percent', group: '績效指標', type: 'profit', sensitive: true },
    { label: '最大回撤', value: '-7.31%', icon: 'bi-graph-down-arrow', group: '績效指標', type: 'loss', sensitive: true },
    { label: '勝率', value: '64.8%', icon: 'bi-bullseye', group: '績效指標' },
    { label: '盈虧比', value: '1.87', icon: 'bi-sliders', group: '績效指標' },
    { label: '總交易次數', value: '284', icon: 'bi-arrow-left-right', group: '績效指標' }
  ];


  readonly filteredItems = computed(() => {
    const term = this.query().trim().toLocaleLowerCase();
    if (!term) return this.items;


    return this.items.filter(item =>
      `${item.label} ${item.value} ${item.group}`.toLocaleLowerCase().includes(term)
    );
  });


  itemsByGroup(group: StrategyInfoItem['group']): StrategyInfoItem[] {
    return this.filteredItems().filter(item => item.group === group);
  }


  displayValue(item: StrategyInfoItem): string {
    return item.sensitive && !this.showSensitive() ? '••••••' : item.value;
  }


  async copySummary(): Promise<void> {
    const text = this.items.map(item => `${item.label}: ${item.value}`).join('');


    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      window.setTimeout(() => this.copied.set(false), 1600);
    } catch {
      this.copied.set(false);
    }
  }
}
