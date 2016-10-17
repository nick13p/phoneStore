import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {PhoneService} from './phone.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
	selector: 'my-store',
	templateUrl: 'html/store.component.html',
	styleUrls: ['css/store.component.css']
})

export class StoreComponent {
	items: FirebaseListObservable<any[]>;

	constructor(private router: Router, private phoneService: PhoneService) {
		this.items = this.phoneService.items;
	}
}
