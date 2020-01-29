import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpreadSheet } from './spreadsheet/spreadsheet.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SpreadSheet,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
