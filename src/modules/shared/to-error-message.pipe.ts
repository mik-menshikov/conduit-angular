import { Pipe, PipeTransform } from '@angular/core';
import isObject from 'lodash/isObject';

@Pipe({
  name: 'toErrorMessage',
})
export class ToErrorMessagePipe implements PipeTransform {
  transform(value: any): string {
    if (isObject(value)) {
      return Object.entries(value as Record<string, string>)
        .map(([field, msg]) => `${field} ${msg}`)
        .join('');
    }

    return 'Unknown error occured';
  }
}
