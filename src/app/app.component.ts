import { ToolbarModule } from 'primeng/toolbar';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { PROJECT_VERSION } from './version.config';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    TranslocoModule,
    ToolbarModule,
    AvatarModule
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
