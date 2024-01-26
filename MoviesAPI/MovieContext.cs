using Microsoft.EntityFrameworkCore;

namespace MoviesAPI
{
    public class MovieContext :DbContext
    {
      public   DbSet<SearchQuery> SearchQueries { get; set; }
        public MovieContext(DbContextOptions options): base(options)
        {
            
        }
    }
}
