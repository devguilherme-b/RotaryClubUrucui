using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RotaryClubUrucui.Pages.News
{
    public class NewsModel : PageModel
    {
        public List<Noticia> Noticias { get; set; } = [];

        public void OnGet(){
            var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Data", "noticias.json");
            if (System.IO.File.Exists(jsonPath))
            {
                var json = System.IO.File.ReadAllText(jsonPath);

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true // permite "image" ou "ImageUrl"
                };

                var noticias = JsonSerializer.Deserialize<List<Noticia>>(json, options);

                if (noticias != null && noticias.Any())
                {
                    Noticias = noticias;
                    return;
                }
            }

            Noticias = new List<Noticia>
            {
                new Noticia
                {
                    Id = 1,
                    Title = "Nenhuma notícia encontrada",
                    Subtitle = "Por favor, adicione notícias ao arquivo noticias.json",
                    Paragraphs = new List<string> { "Nenhum conteúdo disponível no momento." },
                    ImageUrl = "/images/default-news.jpg"
                }
            };
        }
    }
}

public class Noticia
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public List<string> Paragraphs { get; set; } = new();
    [JsonPropertyName("image")]
    public string ImageUrl { get; set; } = string.Empty;
}
