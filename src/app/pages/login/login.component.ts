import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleThemeComponent } from '../../components/toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    TranslocoModule,
    ToggleThemeComponent,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  value: string = '';
}
