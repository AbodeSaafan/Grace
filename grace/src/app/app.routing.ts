import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GuestCoderComponent} from './components/guest-coder/guest-coder.component';
import {LandingComponent} from './components/landing/landing.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
	{
		path : '',
		component: LandingComponent
	},
	{
		path : 'guest',
		component: GuestCoderComponent
	},
	{
		path: 'files',
		component: DashboardComponent
		// Temp for now for testing
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);