import { ServicoArduinoService } from './servico-arduino.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { Display16x2Component } from './display16x2/display16x2.component';

@NgModule({
  declarations: [
    AppComponent,
    Display16x2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    ServicoArduinoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
