import { Injectable } from '@angular/core';
import { AVAILABLE_LANGUAGES } from '../../app.config';

@Injectable({ providedIn: 'root' })
export class TranslocoHelperService {
  getTranslocoAvailableLangs() {
    const keys = Array.from(AVAILABLE_LANGUAGES.keys());
    const ListOfLanguages = keys.map((k) => {
      return {
        key: k,
        keyToTranslate: AVAILABLE_LANGUAGES.get(k),
      };
    });
    return ListOfLanguages;
  }
}
