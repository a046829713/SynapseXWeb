import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface TradingModel {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  kpis: {
    label: string;
    value: string;
    icon: string;
  }[];
}

@Component({
  selector: 'app-model-card',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './model-card.component.html',
  styleUrl: './model-card.component.css'
})
export class ModelCardComponent {
  @Input() model: TradingModel | undefined;

  constructor() { }
}
