//Solution with 'click everywhere to clear' option
import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[app-dropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

// import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

// @Directive({
//     selector: '[app-dropdown]'
// })
// export class DropdownDirective {
//     //Course solution
//     @HostBinding('class.open') isOpen: boolean = false

//     @HostListener('click') toggleOpen() {
//         this.isOpen = !this.isOpen
//     }

//     //My first solution
//     // constructor(private renderer: Renderer2, private elRef: ElementRef) {}

//     // @HostListener('click') onDropdownClick() {
//     //     const classList: DOMTokenList = this.elRef.nativeElement.classList
//     //     if (classList.contains('open')) {
//     //         this.renderer.removeClass(this.elRef.nativeElement, 'open')
//     //     } else {
//     //         this.renderer.addClass(this.elRef.nativeElement, 'open')
//     //     }
//     // }
// }