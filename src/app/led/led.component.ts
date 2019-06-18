import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Led } from '../model/led';

@Component({
  selector: 'pi-led',
  templateUrl: './led.component.html',
  styleUrls: ['./led.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LedComponent implements OnInit {
  @Input()
  led: Led;

  @Output()
  ledChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  handleClick(ev: MouseEvent) {
    if (ev.ctrlKey) {
      this.ledChange.emit(this.led.index);
    }
  }
}
