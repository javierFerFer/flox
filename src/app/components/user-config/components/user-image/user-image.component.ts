import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { UserStore } from '../../../../stores/user/user.store';

@Component({
  selector: 'app-user-image',
  templateUrl: 'user-image.component.html',
  styleUrl: 'user-image.component.scss',
  imports: [FileUploadModule, CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserImageComponent),
      multi: true,
    },
  ],
})
export class UserImageComponent implements ControlValueAccessor {
  readonly userStore = inject(UserStore);
  imageUrl: string | undefined = '';
  disabled = false;

  onUpload(event: any) {
    const file = event.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string; // <-- this is the string you can save
      this.imageUrl = base64String; // for preview

      this.onChange(this.imageUrl);
      this.onTouched();
    };
    reader.readAsDataURL(file);
  }

  onChange = (imageValue: string | undefined) => {
    this.imageUrl = imageValue;
  };
  onTouched = () => {};
  writeValue(e: any): void {
    this.imageUrl = e;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
