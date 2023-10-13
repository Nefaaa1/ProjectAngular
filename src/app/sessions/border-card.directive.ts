import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  constructor(private el : ElementRef) { 
    this.setBorder('transparent');
  }

  @Input('appBorderCard') borderColor: string | undefined;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || "#B5FBB7");
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('transparent');
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
