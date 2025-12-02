import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkComplexHTML',
})
export class CheckComplexHTMLPipe implements PipeTransform {
  transform(value: string | null): any {
    const isHTMLFormatRegex = /<[^>]*>/g;
    return isHTMLFormatRegex.test(value || '');
  }
}
