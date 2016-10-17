import {Component} from '@angular/core';
import {PhoneService} from './phone.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
	selector: 'my-control',
	templateUrl: 'html/control.component.html',
	styleUrls: ['css/control.component.css']
})

export class ControlComponent {
	items: FirebaseListObservable<any[]>;
	storage: any;

	constructor(private phoneService: PhoneService) {
		this.items = this.phoneService.items;
		this.storage = this.phoneService.storage;
	}

	addItem(name, description, presence): void {
		let fileButton = document.getElementById('fileButton'),
				length = fileButton.files.length,
				fielsIsFull = name !== "" && description !== "" && presence !== "" && length !== 0;
		if(fielsIsFull) {
			let arrayImgs = [],
					fileName;
			for (let i = 0; i < length; i++) {
				fileName = fileButton.files[i].name;
				this.storage.ref('phones/' + fileName).put(fileButton.files[i]);
				arrayImgs[i] = fileName;
			}
			this.items.push({
				name: name,
				description: description,
				presence: presence === "true" ? true : false,
				imgs: arrayImgs
			}).then(this.clearForm);
		}
	}

	deleteItem(item): void {
		for (let i = 0, desertRef; i < item.imgs.length; i++) {
			desertRef = this.storage.ref('phones/' +  item.imgs[i]);
			desertRef.delete().then(function() {
				console.log('File deleted successfully');
			}).catch(function(error) {
				console.log(error);
			});
		}
		this.items.remove(item.$key);
	}

	clearForm(){
		// TO DO:
	}
}