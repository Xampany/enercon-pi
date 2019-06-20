import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Led } from '../model/led';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { COLORS } from './colors';

// https://stackblitz.com/edit/enercon-ws
@Injectable()
export class ColorService {
  constructor(
    private readonly client: HttpClient,
    @Inject('URL') private readonly url: string,
    @Inject(COLORS) private readonly colors: string[]
  ) {}

  /**
   *
   * @param index The 0 based index
   * @param color The color
   */
  updateLed(index: number, color = 'goldenrod') {
    const body = { color };
    const color$ = this.client.put(this.url + '/colors/' + index, body, {
      responseType: 'text'
    });
    // TODO add proper datatype
    return color$.pipe(tap(res => console.log(res)));
  }

  /**
   * Retrieves the list of led objects from the Pi
   */
  readLeds(): Observable<Led[]> {
    const colors$ = this.client.get<string[]>(this.url + '/colors');
    return colors$.pipe(
      tap(value => console.log(value)),
      map(this.parseColors),
      catchError(() => of(this.parseColors(this.colors)))
    );
  }

  /**
   *
   * @param colors The colors as an array of valid css color values
   */
  private parseColors(colors: string[]): Led[] {
    return colors.map((color, index) => ({
      index,
      color
    }));
  }
}
