import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';





@Component({
    selector: 'app-strategy',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './strategy.component.html',
    styleUrl: './strategy.component.scss'
})
export class StrategyComponent {
    showDetail = output<boolean>()

    OnShowDetail(event: PointerEvent) {
        this.showDetail.emit(true);

    }
}
