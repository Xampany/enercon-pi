import { InjectionToken } from '@angular/core';
import * as tinycolor from 'tinycolor2';

export const COLORS = new InjectionToken<string[]>('the list of colors', {
  providedIn: 'root',
  factory: () => Array.from(Array<void>(8), () => tinycolor.random().toString())
});
