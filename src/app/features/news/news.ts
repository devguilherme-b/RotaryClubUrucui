import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news.html',
  styleUrl: './news.css'
})

export class News {
  noticias: Noticia[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    debugger;
    this.http.get<Noticia[]>('assets/Data/noticias.json').subscribe({
      next: data => {
        this.noticias = data?.length ? data : this.getNoticiaPadrao();
      },
      error: error => {
        console.error('Erro ao carregar notícias:', error);
        this.noticias = this.getNoticiaPadrao();
      }
    });
  }

  getNoticiaPadrao(): Noticia[] {
    return [
      {
        Id: 1,
        Title: 'Nenhuma notícia encontrada',
        Subtitle: 'Adicione notícias ao arquivo noticias.json',
        Paragraphs: ['Nenhum conteúdo disponível no momento.'],
        ImageUrl: 'assets/default-news.jpg',
        Images: []
      }
    ];
  }
}

class Noticia { 
  Id: number = 0; 
  Title: string = ""; 
  Subtitle: string = ""; 
  Paragraphs: string[] = []; 
  ImageUrl: string = ""; 
  Images: string[] = []; 
}