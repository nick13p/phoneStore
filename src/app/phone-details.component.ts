import {Component} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PhoneService} from './phone.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
	selector: 'my-phone-details',
	templateUrl: 'html/phone-details.component.html',
	styleUrls: ['css/phone-details.component.css']
})

export class PhoneDetailsComponent {
	items: FirebaseListObservable<any[]>;
	id: string;

	constructor(private phoneService: PhoneService, private route: ActivatedRoute) {
		this.items = this.phoneService.items;
		this.route.params.forEach((params: Params) => {
			this.id = params['key'];
		});
	}
}