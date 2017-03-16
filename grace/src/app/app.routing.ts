import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GuestCoderComponent} from './components/guest-coder/guest-coder.component';
import {LandingComponent} from './components/landing/landing.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SettingsComponent} from './components/settings/settings.component';

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
		path: 'dash',
		component: DashboardComponent
	},
	{
		path: 'side',
		component: SettingsComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);