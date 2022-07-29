import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-template',
  templateUrl: 'auth-template.component.html',
  styleUrls: ['auth-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthTemplateComponent {}
