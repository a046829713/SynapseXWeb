import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { timeFormat } from 'd3-time-format';
// 為了 TypeScript 的型別安全，定義一個資料點的介面
interface DataPoint {
	datetimelist: string;
	CloseProfit: number;
}

@Component({
	selector: 'app-equity-chart',
	standalone: true,
	imports: [FormsModule], // 匯入 FormsModule
	templateUrl: './equity-chart.component.html', // 我們將在下面修改這個檔案
	styleUrls: ['./equity-chart.component.css']
})
export class EquityChartComponent implements OnInit, AfterViewInit {

	// 使用 @Input 裝飾器，讓父元件可以傳入 data
	@Input() data: DataPoint[] = [];

	// 使用 @ViewChild 取得 HTML 模板中的 #chart 元素
	@ViewChild('chart') private chartContainer!: ElementRef;

	// 用於綁定 textarea 的 JSON 字串資料
	public jsonData: string = JSON.stringify([
		{ "datetimelist": "2025-09-28 09:30:00", "CloseProfit": 150.75 },
		{ "datetimelist": "2025-09-28 10:00:00", "CloseProfit": 152.30 },
		{ "datetimelist": "2025-09-28 10:30:00", "CloseProfit": 151.90 },
		{ "datetimelist": "2025-09-28 11:00:00", "CloseProfit": 153.50 },
		{ "datetimelist": "2025-09-28 11:30:00", "CloseProfit": 155.10 },
		{ "datetimelist": "2025-09-28 12:00:00", "CloseProfit": 154.80 },
		{ "datetimelist": "2025-09-28 12:30:00", "CloseProfit": 156.20 },
		{ "datetimelist": "2025-09-28 13:00:00", "CloseProfit": 155.95 }
	], null, 2);

	constructor() { }

	ngOnInit(): void {
		// 初始時不清空 data，而是使用 jsonData 的預設值來繪製圖表
		
	}

	ngAfterViewInit(): void {
		// ngOnInit 中已經呼叫 onSubmit，所以這裡不需要再繪製
		this.onSubmit();
	}

	// 處理表單提交
	onSubmit(): void {
		try {
			console.log(this.jsonData)
			this.data = JSON.parse(this.jsonData);
			
			if (this.data && this.data.length > 0) {
				this.createChart();
			}
		} catch (error) {
			console.error('無效的 JSON 格式:', error);
			alert('錯誤：請檢查您輸入的 JSON 格式是否正確。');
		}
	}

	private createChart(): void {
		// 清除舊圖表，避免重複繪製
		d3.select(this.chartContainer.nativeElement).select('svg').remove();

		const element = this.chartContainer.nativeElement;
		const data = this.data;

		const totalWidth = element.offsetWidth;


		// 1. 設定圖表尺寸和邊距
		const margin = { top: 50, right: 50, bottom: 50, left: 70 };
		const width = totalWidth - margin.left - margin.right;
		const height = 800 - margin.top - margin.bottom;

		// 2. 創建 SVG 元素
		const svg = d3.select(element)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		// 3. 解析日期格式並轉換資料
		const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S');
		const processedData = data.map(d => ({
			datetimelist: parseTime(d.datetimelist)!,
			CloseProfit: +d.CloseProfit
		})).sort((a, b) => a.datetimelist.getTime() - b.datetimelist.getTime()); // 確保資料按時間排序

		// 4. 設定 X 軸和 Y 軸的比例尺
		const x = d3.scaleTime()
			.domain(d3.extent(processedData, d => d.datetimelist) as [Date, Date])
			.range([0, width]);

		const yMin = d3.min(processedData, d => d.CloseProfit) as number;
		const yMax = d3.max(processedData, d => d.CloseProfit) as number;
		const y = d3.scaleLinear()
			.domain([yMin * 0.98, yMax * 1.02])
			.range([height, 0]);

		// 5. 加入格線
		svg.append('g')
			.attr('class', 'grid')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x).ticks(5).tickSize(-height).tickFormat(() => ""));

		svg.append('g')
			.attr('class', 'grid')
			.call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => ""));

		// 6. 創建 X 軸和 Y 軸
		svg.append('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
			.style("font-size", "14px"); // 放大 X 軸字體

		svg.append('g')
			.attr('class', 'y-axis')
			.call(d3.axisLeft(y))
			.selectAll("text")
			.style("font-size", "14px"); // 放大 Y 軸字體

		// 7. 建立漸層
		const defs = svg.append('defs');
		const linearGradient = defs.append('linearGradient')
			.attr('id', 'area-gradient')
			.attr('x1', '0%').attr('y1', '0%')
			.attr('x2', '0%').attr('y2', '100%');

		linearGradient.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', 'steelblue')
			.attr('stop-opacity', 0.4);

		linearGradient.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', 'steelblue')
			.attr('stop-opacity', 0);

		// 8. 繪製面積圖
		const area = d3.area<{ datetimelist: Date, CloseProfit: number }>()
			.x(d => x(d.datetimelist))
			.y0(height)
			.y1(d => y(d.CloseProfit));

		svg.append('path')
			.datum(processedData)
			.attr('class', 'area')
			.attr('d', area)
			.style('fill', 'url(#area-gradient)');

		// 9. 繪製線條
		const line = d3.line<{ datetimelist: Date, CloseProfit: number }>()
			.x(d => x(d.datetimelist))
			.y(d => y(d.CloseProfit));

		svg.append('path')
			.datum(processedData)
			.attr('class', 'line')
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 1.5)
			.attr('d', line);

		// 10. 建立 Tooltip
		const tooltip = d3.select(element).append('div').attr('class', 'tooltip').style('opacity', 0);

		// 11. 為每個資料點加上圓圈，並綁定事件
		svg.selectAll('.dot')
			.data(processedData)
			.enter().append('circle')
			.attr('class', 'dot')
			.attr('cx', d => x(d.datetimelist))
			.attr('cy', d => y(d.CloseProfit))
			.attr('r', 5) // 圓圈半徑
			.attr('fill', 'green') // 圓圈顏色
			.style('cursor', 'pointer') // 讓滑鼠變成指標
			.on('mouseover', () => {
				tooltip.style('opacity', 1);
			})
			.on('mouseout', () => {
				tooltip.style('opacity', 0);
			})
			.on('mousemove', (event, d) => {
				const tooltipFormat = timeFormat('%Y-%m-%d %H:%M');
				tooltip.html(`
					<div>日期: ${tooltipFormat(d.datetimelist)}</div>
					<div>權益: ${d.CloseProfit.toFixed(2)}</div>
				`)
				.style('left', `${event.pageX + 15}px`)
				.style('top', `${event.pageY - 28}px`);
			});
	}
}
