import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  forwardRef,
  HostBinding,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrl: 'text-editor.component.scss',
  imports: [CommonModule, EditorModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true,
    },
  ],
})
export class TextEditorComponent implements ControlValueAccessor {
  @Input()
  value: string | undefined = '';

  @Input({ transform: booleanAttribute })
  @HostBinding('class.is-disabled')
  disabled = false;

  @Input()
  editorModules: Object = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],

      ['bold', 'italic', 'underline', 'strike'],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],

      ['clean'],
    ],
  };

  onChange = (value: string | undefined) => {
    this.value = value;
  };

  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
