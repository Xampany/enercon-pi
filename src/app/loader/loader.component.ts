import { Component, OnInit, Input } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

type Dot = '.';

@Component({
  selector: 'pi-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  dots$: Observable<string>;

  // tslint:disable-next-line: variable-name
  private _dots: string[] = Array(100).fill('.');

  // tslint:disable-next-line: variable-name
  private _count: number;

  @Input()
  set count(count: number) {
    this._count = count;
  }

  @Input()
  frequency = 1;

  constructor() {}

  ngOnInit() {
    const period = 1e3 / this.frequency;
    this.dots$ = interval(period).pipe(
      map(i => (i - 1) % this._count),
      map(i => i + 1),
      map(i => this._dots.slice(0, i).join(' '))
    );
  }
}
