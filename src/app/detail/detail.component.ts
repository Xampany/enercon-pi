import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Led } from '../model/led';
import { ColorService } from '../shared/color.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pi-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  led: Led;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: ColorService
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    // const led = this.route.snapshot.data['led'];
    const index = this.route.snapshot.paramMap.get('index');

    this.service
      .readLeds()
      .pipe(map(leds => leds[index]))
      .subscribe({
        next: led => (this.led = led)
      });
  }
}
