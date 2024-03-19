import { DoubleClickEditDirective } from './double-click-edit.directive';
import { ElementRef } from '@angular/core'; // Import ElementRef

describe('DoubleClickEditDirective', () => {
  it('should create an instance', () => {
    const elMock: ElementRef = {} as ElementRef; // Create a mock ElementRef
    const directive = new DoubleClickEditDirective(elMock); // Pass the mock ElementRef
    expect(directive).toBeTruthy();
  });
});
