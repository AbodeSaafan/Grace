import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GuestCoderComponent} from './components/guest-coder/guest-coder.component';
import {LandingComponent} from './components/landing/landing.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SettingsComponent} from './components/settings/settings.component';
import {UserCoderComponent} from './components/user-coder/user-coder.component';
import {SharedViewComponent} from './components/shared-view/shared-view.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

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
		path: 'user',
		component: UserCoderComponent
	},
	{
		path: 'file/:id',
		component:  SharedViewComponent
	},
	{
		path: '404',
		component: NotFoundComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);