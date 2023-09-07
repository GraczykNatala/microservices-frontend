import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterLink, HttpClientModule, RouterLinkActive],
  exports: [HeaderComponent],
})
export class CoreModule {}
