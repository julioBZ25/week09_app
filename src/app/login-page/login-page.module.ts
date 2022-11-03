import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './effects/login.effects';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.loginReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
