import { CommonModule } from '@angular/common';
import { Component, contentChild, Signal } from '@angular/core';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-text-editor',
  templateUrl: 'text-editor.component.html',
  imports: [CommonModule, EditorModule],
})
export class TextEditorComponent {
  header_content: Signal<any> = contentChild('header_content');
}
