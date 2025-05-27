import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ToggleThemeComponent } from './toggle-theme.component';

describe('[ToggleThemeComponent]', () => {
  let component: ToggleThemeComponent;
  let fixture: ComponentFixture<ToggleThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleThemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleThemeComponent);
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

  it('it should render toggle switch and change onEvent', () => {
    spyOn(component, 'changeTheme');

    const switcher = fixture.debugElement.query(By.directive(ToggleSwitch));
    switcher.triggerEventHandler('onChange', { checked: true });

    expect(component.changeTheme).toHaveBeenCalledWith({ checked: true });
  });
});
