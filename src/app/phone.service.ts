import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Injectable} from '@angular/core';

@Injectable()
export class PhoneService{
	items: FirebaseListObservable<any[]>;
	storage: any;

	constructor(af: AngularFire) {
		this.items = af.database.list('');
		this.storage = firebase.storage();
	}
}