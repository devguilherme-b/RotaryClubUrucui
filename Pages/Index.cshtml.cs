using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RotaryClubUrucui.Pages
{
    public class IndexModel : PageModel
    {
        public string BaseAddress { get; set; } = string.Empty;
        private readonly ILogger<IndexModel> _logger;
        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }
        public void OnGet()
        {
            BaseAddress = $"{Request.Scheme}://{Request.Host}.";
        }
    }
}
