import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ControlComponent} from './control.component';
import {StoreComponent} from './store.component';
import {PhoneDetailsComponent} from './phone-details.component';

const appRoutes: Routes = [
	{
		path: 'phone/:key',
		component: PhoneDetailsComponent
	},
	{
		path: 'control',
		component: ControlComponent
	},
	{
		path: 'store',
		component: StoreComponent
	},
	{
		path: '',
		redirectTo: '/store',
		pathMatch: 'full'
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);