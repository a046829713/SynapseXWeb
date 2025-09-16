import { Component, AfterViewInit, ElementRef, ViewChild, Input, Renderer2 } from '@angular/core';

// 為了讓 TypeScript 能夠識別 TradingView 這個全域變數
declare const TradingView: any;

@Component({
  selector: 'app-backtest',
  standalone:true,
  imports:[],
  templateUrl: './backtest.component.html',
  styleUrls: ['./backtest.component.css']
})

export class BacktestComponent implements AfterViewInit {

  // 使用 @ViewChild 取得 HTML 範本中的 #tradingviewContainer 元素
  @ViewChild('tradingviewContainer') tradingviewContainer!: ElementRef;
  
  // 可以透過 @Input 讓父元件傳入 symbol，增加可重用性
  @Input() symbol: string = 'NASDAQ:AAPL'; 

  // 注入 Renderer2 來安全地操作 DOM
  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // 建立 script 元素
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;

    // 將設定的 JSON 物件轉換為字串，並設定為 script 的 innerHTML
    // 使用樣板字串 (backticks) 可以輕鬆地處理多行 JSON
    script.innerHTML = `
    {
      "allow_symbol_change": true,
      "calendar": false,
      "details": false,
      "hide_side_toolbar": true,
      "hide_top_toolbar": false,
      "hide_legend": false,
      "hide_volume": false,
      "hotlist": false,
      "interval": "D",
      "locale": "en",
      "save_image": true,
      "style": "1",
      "symbol": "${this.symbol}",
      "theme": "light",
      "timezone": "Etc/UTC",
      "backgroundColor": "#ffffff",
      "gridColor": "rgba(46, 46, 46, 0.06)",
      "watchlist": [],
      "withdateranges": false,
      "compareSymbols": [],
      "studies": [],
      "autosize": true
    }`;

    // 將 script 元素附加到我們在 HTML 中定義的容器中
    this.renderer.appendChild(this.tradingviewContainer.nativeElement, script);
  }
}