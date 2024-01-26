namespace MoviesAPI.Requests
{
    public class SearchResults
    {
        public List<MovieSearchResult> Search { get; set; }
        public int TotalResults { get; set; }
        public bool Response { get; set; }
    }
}
