import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelCardComponent } from '../components/model-card/model-card.component';
import { tradingModelsIntroduces } from './backtest.service';

@Component({
  selector: 'app-backtest',
  standalone: true,
  imports: [CommonModule, ModelCardComponent],
  templateUrl: './backtest.component.html',
  styleUrl: './backtest.component.css'
})
export class BacktestComponent {
  Introduces = tradingModelsIntroduces;
}