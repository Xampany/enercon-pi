import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LedComponent } from './led/led.component';
import { LedListComponent } from './led-list/led-list.component';
import { ColorService } from './shared/color.service';

@NgModule({
  declarations: [AppComponent, LedComponent, LedListComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: ColorService,
      useClass: ColorService
    },
    {
      provide: 'URL',
      useValue:
        'https://e058e2af50c2bd0a8119d48dffc38266.balena-devices.com/api'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
