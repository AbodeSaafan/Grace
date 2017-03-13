import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CompilerComponent} from './compiler/compiler.component';
import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';

const appRoutes: Routes = [
	{
		path : '',
		component: LandingComponent
	},
	{
		path : 'compiler',
		component: CompilerComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);