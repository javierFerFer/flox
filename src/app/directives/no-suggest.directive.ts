import { Directive, ElementRef, inject, OnInit } from '@angular/core';
import { UserStore } from '../stores/user/user.store';

@Directive({ selector: '[noSuggest]' })
export class NoSuggestDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly userStore = inject(UserStore);

  ngOnInit(): void {
    if (!this.userStore.user().userConfig?.suggestInputs) {
      (this.elementRef.nativeElement as HTMLInputElement).autocomplete = 'off';
    } else {
      (this.elementRef.nativeElement as HTMLInputElement).autocomplete = 'on';
    }
  }
}
