import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PROJECT_VERSION } from './version.config';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    TranslocoModule,
    ToolbarModule,
    AvatarModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flox';
  version: string = '';
  constructor() {
    const { version } = inject(PROJECT_VERSION);
    this.version = version;
  }
}
