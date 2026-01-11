import { Component } from '@angular/core';
import { Home } from '../../features/home/home';
import { About } from "../../features/about/about";
import { Projects } from "../../features/projects/projects";
import { Blog } from "../../features/blog/blog";
import { Agenda } from "../../features/agenda/agenda";
import { Partners } from "../../features/partners/partners";
import { Contribute } from "../../features/contribute/contribute";
import { Contacts } from '../../features/contacts/contacts';

@Component({
  selector: 'app-home-page',
  imports: [Home, About, Projects, Blog, Agenda, Partners, Contribute, Contacts],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
}
