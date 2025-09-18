import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

// 為了 TypeScript 的型別安全，定義一個資料點的介面
interface DataPoint {
	datetimelist: string;
	CloseProfit: number;
}

@Component({
	selector: 'app-equity-chart',
	templateUrl: './equity-chart.component.html',
	styleUrls: ['./equity-chart.component.css']
})
export class EquityChartComponent implements OnInit, AfterViewInit {

	// 使用 @Input 裝飾器，讓父元件可以傳入 data
	@Input() data: DataPoint[] = [];

	// 使用 @ViewChild 取得 HTML 模板中的 #chart 元素
	@ViewChild('chart') private chartContainer!: ElementRef;

	constructor() { }

	ngOnInit(): void {
		// ngOnInit 通常用來做資料的初始化，但此時 DOM 元素還沒準備好
	}

	ngAfterViewInit(): void {
		// 確保 data 存在才繪製圖表
		if (this.data && this.data.length > 0) {
			this.createChart();
		}
	}

	private createChart(): void {
		const data = this.data;
		const element = this.chartContainer.nativeElement;

		// 1. 設定圖表尺寸和邊距
		const margin = { top: 20, right: 30, bottom: 60, left: 60 };
		const width = element.offsetWidth - margin.left - margin.right;
		const height = 400 - margin.top - margin.bottom;

		// 2. 創建 SVG 元素
		const svg = d3.select(element)
			.append('svg')
			.attr('width', element.offsetWidth)
			.attr('height', 400)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		// 3. 解析日期格式並轉換資料
		const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S');
		const processedData = data.map((d: any) => ({
			datetimelist: parseTime(d.datetimelist)!,
			CloseProfit: +d.CloseProfit
		}));

		// 4. 設定 X 軸和 Y 軸的比例尺
		const x = d3.scaleTime()
			.domain(d3.extent(processedData, d => d.datetimelist) as [Date, Date])
			.range([0, width]);

		const y = d3.scaleLinear()
			.domain([
				(d3.min(processedData, d => d.CloseProfit) as number) * 0.98,
				(d3.max(processedData, d => d.CloseProfit) as number) * 1.02
			])
			.range([height, 0]);

		// // 5. 創建 X 軸和 Y 軸
		// svg.append('g')
		// 	.attr('transform', `translate(0, ${height})`)
		// 	.call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%m/%d %H:%M')))
		// 	.selectAll('text')
		// 	.style('text-anchor', 'end')
		// 	.attr('transform', 'rotate(-45)');

		// svg.append('g').call(d3.axisLeft(y));

		// // 6. 繪製線條
		// const line = d3.line<{ datetimelist: Date, CloseProfit: number }>()
		// 	.x(d => x(d.datetimelist))
		// 	.y(d => y(d.CloseProfit));

		// svg.append('path')
		// 	.datum(processedData)
		// 	.attr('fill', 'none')
		// 	.attr('stroke', 'steelblue')
		// 	.attr('stroke-width', 2)
		// 	.attr('d', line);

	}
}