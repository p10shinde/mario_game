import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTestdirective]'
})
export class TestdirectiveDirective {

  constructor(private el: ElementRef) {
    console.log(el.nativeElement);
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
