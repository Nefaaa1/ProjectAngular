import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderUser]'
})
export class BorderCardDirective {
  constructor(private el: ElementRef) {
    this.setBorder('transparent');
  }

  @Input('appBorderUser') borderColor: string | undefined;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || "#FBA3A3");
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('transparent');
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
}
