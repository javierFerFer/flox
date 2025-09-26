import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastService } from './toast.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [MessageService, ToastService],
})
export class ToastMessagingModule {}
