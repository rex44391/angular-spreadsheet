import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from "@angular/core";
import { fromEvent, animationFrameScheduler, race, merge } from 'rxjs';
import { map, concatAll, takeUntil, switchMap, subscribeOn, tap, switchAll, finalize, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-x-scroll',
  templateUrl: './x-scroll.component.html',
  styleUrls: ['./x-scroll.component.css']
})
export class XSrollComponent implements AfterViewInit {
  @ViewChild('xScrollBorder', { static: false}) scrollBorder: ElementRef;
  @ViewChild('xScrollScroller', { static: false}) scroller: ElementRef;

  mouseDown$;
  mouseUp$;
  mouseMove$;
  mouseLeave$;

  mouseClick$;
  
  leftLimit; 
  rightLimit;
  diff;

  ratioPos;

  constructor(private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    this.mouseDown$ = fromEvent<MouseEvent>(this.scroller.nativeElement, 'mousedown');
    this.mouseUp$ = fromEvent<MouseEvent>(this.scroller.nativeElement, 'mouseup');
    this.mouseMove$ = fromEvent<MouseEvent>(this.scrollBorder.nativeElement, 'mousemove');
    this.mouseLeave$ = fromEvent<MouseEvent>(this.scrollBorder.nativeElement, 'mouseleave');
    this.mouseClick$ = fromEvent<MouseEvent>(this.scrollBorder.nativeElement, 'click');

    
    this.leftLimit = this.scrollBorder.nativeElement.getBoundingClientRect().x;
    this.rightLimit = this.scrollBorder.nativeElement.getBoundingClientRect().right;
    this.diff = this.scroller.nativeElement.getBoundingClientRect().width;
    const leaveCondtion$ = merge(this.mouseUp$, this.mouseLeave$, this.mouseClick$);
    //drag scroller
    this.mouseDown$.pipe(
      map( (event:MouseEvent) => this.mouseMove$.pipe(
        takeUntil(leaveCondtion$)
      )),
      switchAll(),
      throttleTime(12),
      map( (event: MouseEvent) => ({ x: event.clientX, y: event.clientY })),
    ).subscribe((pos) => {
        let adjustedPosX = pos.x - this.diff;
        if( adjustedPosX < this.leftLimit) {
          adjustedPosX = this.leftLimit;
        } else if(adjustedPosX > this.rightLimit) {
          adjustedPosX = this.rightLimit;
        }       
        this.renderer.setStyle(this.scroller.nativeElement, 'left', adjustedPosX + 'px');
    });

    this.mouseDown$.subscribe(() => {
      this.renderer.addClass(this.scroller.nativeElement, 'boxblur');
    })
    leaveCondtion$.subscribe(() => {
      this.renderer.removeClass(this.scroller.nativeElement, 'boxblur');
    })

    //click on scroller border
    this.mouseClick$.pipe(
      map((event: MouseEvent) => {
        return event.clientX;
      })
    ).subscribe(posX => {
      let adjustedPosX = posX - this.diff;
      this.renderer.setStyle(this.scroller.nativeElement, 'left', adjustedPosX + 'px');
    })
  }
  
  @HostListener('window: resize', ['$event'])
  onResize(event) {
    this.leftLimit = this.scrollBorder.nativeElement.getBoundingClientRect().x;
    this.rightLimit = this.scrollBorder.nativeElement.getBoundingClientRect().right;
    this.diff = this.scroller.nativeElement.getBoundingClientRect().width;
  }
}