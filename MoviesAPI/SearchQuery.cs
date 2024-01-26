namespace MoviesAPI
{
    public class SearchQuery
    {
        public string QueryName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Id { get; set; } = Guid.NewGuid().ToString();
    }
}
