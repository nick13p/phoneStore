import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AngularFireModule} from 'angularfire2';

import {AppComponent} from './app.component';
import {ControlComponent} from './control.component';
import {StoreComponent} from './store.component';
import {PhoneDetailsComponent} from './phone-details.component';

import {LoupeDirective} from './loupe.directive';

import {PhoneService} from './phone.service';

import {routing} from './app.routing';

export const firebaseConfig = {
	apiKey: "AIzaSyApQu68OgzLgNX7hn3gyvXmE__XG3dtQYA",
	authDomain: "heroes-cd192.firebaseapp.com",
	databaseURL: "https://heroes-cd192.firebaseio.com",
	storageBucket: "heroes-cd192.appspot.com",
	messagingSenderId: "1049681154503"
};

@NgModule({
	declarations: [
		AppComponent,
		ControlComponent,
		StoreComponent,
		PhoneDetailsComponent,
		LoupeDirective
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig),
		routing
	],
	providers: [PhoneService],
	bootstrap: [AppComponent]
})

export class AppModule { }
