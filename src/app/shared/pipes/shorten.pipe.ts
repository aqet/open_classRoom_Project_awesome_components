import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, maxlength: number=50): string {
    if (value.length <= 50) {
      return value;
    }
    return value.substring(0, maxlength) + '…';
  }
}