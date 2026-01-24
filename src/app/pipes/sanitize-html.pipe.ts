import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeHTML',
})
export class SanitizeHTMLPipe implements PipeTransform {
  transform(value: string | null): any {
    return value
      ? new DOMParser().parseFromString(value, 'text/html').body.textContent
      : value;
  }
}
