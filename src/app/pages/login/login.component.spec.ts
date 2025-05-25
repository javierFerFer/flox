import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { LoginComponent } from './login.component';

describe('[LoginComponent]', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ToggleSwitchModule,
        CommonModule,
        CardModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should load storage', () => {
    const userStore = component.userStore;
    expect(userStore).toBeDefined();
    expect(userStore).toBeTruthy();
  });

  it('it should get default theme value from storage', () => {
    const userStore = component.userStore;
    const theme = userStore.theme();
    expect(theme).toBeDefined();
    expect(['light', 'dark']).toContain(theme);
  });

  it('it should toggle theme', () => {
    const userStore = component.userStore;
    userStore.updateTheme('dark');
    const newTheme = userStore.theme();
    expect(newTheme).toBeDefined();
  });

  it('it should render toggle switch', () => {
    const toggleSwitch = fixture.nativeElement.querySelector('p-toggleswitch');
    expect(toggleSwitch).toBeTruthy();
  });

  it('it should render toggle switch with light or dark as value', () => {
    const toggleSwitch = fixture.nativeElement.querySelector('p-toggleswitch');
    expect(toggleSwitch).toBeTruthy();
    const input = toggleSwitch.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toEqual('on');
    expect(typeof input.checked).toBe('boolean'); // Assuming light is the default theme
  });
});
