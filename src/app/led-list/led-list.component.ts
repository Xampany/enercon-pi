import { Component, OnInit } from '@angular/core';
import { Led } from '../model/led';
import { ColorService } from '../shared/color.service';
import { timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pi-led-list',
  templateUrl: './led-list.component.html',
  styleUrls: ['./led-list.component.css']
})
export class LedListComponent implements OnInit {
  leds: Led[];

  constructor(private readonly service: ColorService) {}

  ngOnInit() {
    timer(2000, 5000)
      .pipe(
        tap(v => console.log(v)),
        switchMap(() => this.service.readLeds())
      )
      .subscribe({
        next: res => {
          this.leds = res;
        },
        complete: () => console.log('done')
      });
  }

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
