using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;

namespace RotaryClubUrucui.Pages.News
{
    public class NewsDetailsModel : PageModel
    {
        public string CurrencyUrl { get; set; } = string.Empty;
        public Noticia? Noticia { get; set; }
        public void OnGet(int id)
        {
            var jsoPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Data", "noticias.json");
            var json = System.IO.File.ReadAllText(jsoPath);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true // permite "image" ou "ImageUrl"
            };
            var noticias = JsonSerializer.Deserialize<List<Noticia>>(json, options);

            if (noticias != null)
            {
                Noticia = noticias.FirstOrDefault(n => n.Id == id);
            }

            CurrencyUrl = $"{Request.Scheme}://{Request.Host}{Request.Path}{Request.QueryString}";
        }
    }
}
