import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { MessageService, ToastMessageOptions } from 'primeng/api';

interface internalCustomToastMessageOptions {
  summaryToTranslate: string;
  detailToTranslate: string;
}

export type ToastMessageCustomOptions = internalCustomToastMessageOptions &
  Omit<ToastMessageOptions, 'summary' | 'detail'>;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly messageService = inject(MessageService);
  private readonly translocoService = inject(TranslocoService);

  showErrorMessage(options: ToastMessageCustomOptions) {
    const optionsToUse = {
      severity: 'error',
      summary: this.translocoService.translate(options.summaryToTranslate!),
      detail: this.translocoService.translate(options.detailToTranslate!),
      life: options.life ? options.life : 3000,
    } as ToastMessageOptions;
    this.messageService.add(optionsToUse);
  }
}
