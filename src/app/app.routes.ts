import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

import { Home } from './features/home/home';
import { About } from './features/about/about';

export const routes: Routes = [
    {
        path: '', 
        component: HomePage,
        children: [
            {path: '', component: Home},
            {path: 'about', component: About}
        ]
    }
];
