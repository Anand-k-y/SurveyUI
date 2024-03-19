import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appDoubleClickEdit]'
})
export class DoubleClickEditDirective {
  @Output() doubleClick: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('dblclick') onDoubleClick() {
    const cell = this.el.nativeElement;
    // cell.classList.add('edit-mode');
    this.doubleClick.emit(cell); // Emit the event with the cell data
  }
}
