using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Requests
{
    public class MovieRequest
    {
        [Required(ErrorMessage ="Title is required")]
        public string Title { get; set; }

    }
}
