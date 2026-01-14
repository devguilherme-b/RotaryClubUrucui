import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';

import { HomePage } from './pages/home-page/home-page';
import { BoardOfDirectorsPage } from './pages/board-of-directors-page/board-of-directors-page';
import { AgendaPage } from './pages/agenda-page/agenda-page';

export const routes: Routes = [
    {
        path: '', 
        component: HomePage,
        children: [
            {path: '', component: Home},
            {path: 'about', component: About}
        ]
    },
    {
        path: 'diretoria', 
        component: BoardOfDirectorsPage
    },
    {
        path: 'agenda', 
        component: AgendaPage
    }
];
