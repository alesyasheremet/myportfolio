import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForecastLocationComponent } from './forecast-location/forecast-location.component';
import { ForecastLocationSearchComponent } from './forecast-location-search/forecast-location-search.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrentForecastComponent } from './current-forecast/current-forecast.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastLocationComponent,
    ForecastLocationSearchComponent,
    CurrentForecastComponent,
    DailyForecastComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
