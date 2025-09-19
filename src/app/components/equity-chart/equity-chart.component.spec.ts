import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityChartComponent } from './equity-chart.component';

describe('EquityChartComponent', () => {
  let component: EquityChartComponent;
  let fixture: ComponentFixture<EquityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
