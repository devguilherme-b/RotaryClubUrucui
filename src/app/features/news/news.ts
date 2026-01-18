import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.css'
})

export class News {
  http: HttpClient;

  constructor(Http: HttpClient) {
    this.http = Http;
  };

  noticias: Noticia[] = [];

  ngOnInit(): void {
    this.http.get<Noticia[]>('assets/noticias.json').subscribe({
      next: data => {
        if (!data || data.length === 0) {
          this.noticias = this.getNoticiaPadrao();
        } else {
          this.noticias = data;
        }
      },
      error: () => {
        this.noticias = this.getNoticiaPadrao();
      }
    });
  }

  getNoticiaPadrao(): Noticia[] {
    return [
      {
        Id: 1,
        Title: "Nenhuma notícia encontrada",
        Subtitle: "Por favor, adicione notícias ao arquivo noticias.json",
        Paragraphs: ["Nenhum conteúdo disponível no momento."],
        ImageUrl: "assets/default-news.jpg",
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