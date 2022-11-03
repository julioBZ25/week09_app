import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
