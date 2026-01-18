import { Routes } from '@angular/router';

import { HomePage } from './pages/home-page/home-page';
import { BoardOfDirectorsPage } from './pages/board-of-directors-page/board-of-directors-page';
import { AgendaPage } from './pages/agenda-page/agenda-page';
import { FingOutMorePage } from './pages/fing-out-more-page/fing-out-more-page';
import { BlogPage } from './pages/blog-page/blog-page';

export const routes: Routes = [
    {
        path: '', 
        component: HomePage,
        pathMatch: 'full'
    },
    {
        path: 'diretoria', 
        component: BoardOfDirectorsPage
    },
    {
        path: 'agenda', 
        component: AgendaPage
    },
    {
        path: 'saiba-mais', 
        component: FingOutMorePage
    },
    {
        path: 'noticias', 
        component: BlogPage
    },
    {
        path: 'noticias/:id', 
        component: BlogPage
    }
];
