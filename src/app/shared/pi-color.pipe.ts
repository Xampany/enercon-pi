import { Pipe, PipeTransform } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Pipe({
  name: 'piColor'
})
export class PiColorPipe implements PipeTransform {
  /**
   *
   * @param value The color value
   * @param format The optional color format
   * @returns The formatted color string
   */
  transform(value: string, format?: any): string {
    return tinycolor(value).toString(format);
  }
}
