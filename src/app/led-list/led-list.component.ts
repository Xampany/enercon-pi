import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Led } from '../model/led';
import { ColorService } from '../shared/color.service';
import { timer, Subscription, Observable } from 'rxjs';
import { tap, switchMap, takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'pi-led-list',
  templateUrl: './led-list.component.html',
  styleUrls: ['./led-list.component.css']
})
export class LedListComponent implements OnInit, OnDestroy {
  leds: Led[];

  leds$: Observable<Led[]>;

  private sub: Subscription;

  private destroy$ = new EventEmitter<void>();

  constructor(private readonly service: ColorService) {}

  ngOnInit() {
    this.leds$ = this.service.readLeds();

    this.sub = timer(2000, 5000)
      .pipe(
        tap(v => console.log(v)),
        switchMap(() => this.service.readLeds()),
        takeUntil(this.destroy$),
        take(2)
      )
      .subscribe({
        next: res => {
          this.leds = res;
        },
        complete: () => console.log('done')
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    // if (this.sub) {
    //   this.sub.unsubscribe();
    // }
  }

  /**
   *
   * @param index The 0 based index of the led
   */
  handleLedChange(index: number) {
    this.service.updateLed(index).subscribe({
      next: color => {
        this.leds[index] = {
          index,
          color
        };
      }
    });
  }
}
