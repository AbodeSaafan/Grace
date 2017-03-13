import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GuestCoderComponent} from './guest-coder/guest-coder.component';
import {LandingComponent} from './landing/landing.component';

const appRoutes: Routes = [
	{
		path : '',
		component: LandingComponent
	},
	{
		path : 'guest',
		component: GuestCoderComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);