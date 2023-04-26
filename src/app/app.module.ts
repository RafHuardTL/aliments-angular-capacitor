import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ErplibreRestService } from './erplibre-rest.service';
import { DialogService } from './dialog.service';
import { ActionSheetService } from './action-sheet.service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [ErplibreRestService, DialogService, ActionSheetService],
	bootstrap: [AppComponent],
})
export class AppModule {}
