import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {
  constructor(private el: ElementRef,
              private renderer: Renderer2) {}

  @Input() color: string='yellow'
  ngAfterViewInit() {
    this.setBackgroundColor(this.color);
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') onMouseenter(){
    this.setBackgroundColor('lightgreen');
  }
  
  @HostListener('mouseleave') onMouseleave(){
    this.setBackgroundColor(this.color);
  }

  @HostListener('click') onClick(){
    this.color = 'lightgreen';
  }
}