import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appScrollAnimation]',
    standalone: true,
})
export class ScrollAnimationDirective {

  constructor(private el: ElementRef<HTMLElement>) { }
  private delay: string; 

  @HostListener('window:scroll', [])
  scroll(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    let scroll = this.mapRange(0, window.innerHeight, 0, 1, rect.top + (rect.height / 2));
    this.delay = `-${scroll.toFixed(2)}s`;
  }

  mapRange(a1, a2, b1, b2, value): number {
    return b1 + ((value - a1) * (b2 - b1) / (a2 - a1));
  }

  @HostBinding('style.animationDelay') get animationDelay(): string {
    return this.delay;
  }
}
