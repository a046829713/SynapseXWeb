import { Directive, Renderer2, inject, DestroyRef, input, output } from '@angular/core';

@Directive({
  selector: '[appResizable]',
  standalone: true,
  host: {
    '(mousedown)': 'onMouseDown($event)'
  }
})
export class ResizableDirective {
  resizableTh = input.required<HTMLElement>();
  widthChange = output<string>();

  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);
  
  private startX: number = 0;
  private startWidth: number = 0;
  
  private unlistenMouseMove: (() => void) | null = null;
  private unlistenMouseUp: (() => void) | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.cleanupListeners();
    });
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.startX = event.pageX;
    this.startWidth = this.resizableTh().offsetWidth;
    this.renderer.addClass(document.body, 'resizing-column');

    // Attach document listeners dynamically for performance
    this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.onMouseMove(e));
    this.unlistenMouseUp = this.renderer.listen('document', 'mouseup', () => this.onMouseUp());
  }

  private onMouseMove(event: MouseEvent) {
    const movementX = event.pageX - this.startX;
    const newWidth = Math.max(30, this.startWidth + movementX);
    
    this.renderer.setStyle(this.resizableTh(), 'width', `${newWidth}px`);
    this.renderer.setStyle(this.resizableTh(), 'min-width', `${newWidth}px`);
  }

  private onMouseUp() {
    this.widthChange.emit(this.resizableTh().style.width);
    this.renderer.removeClass(document.body, 'resizing-column');
    this.cleanupListeners();
  }

  private cleanupListeners() {
    if (this.unlistenMouseMove) {
      this.unlistenMouseMove();
      this.unlistenMouseMove = null;
    }
    if (this.unlistenMouseUp) {
      this.unlistenMouseUp();
      this.unlistenMouseUp = null;
    }
  }
}
