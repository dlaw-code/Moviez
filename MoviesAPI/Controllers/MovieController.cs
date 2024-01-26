using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Requests;
using Newtonsoft.Json;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly MovieContext _movieContext;

        public MovieController(IConfiguration configuration, MovieContext movieContext)
        {
            _configuration = configuration;
            _movieContext = movieContext;

        }



        [HttpGet("searchResults")]
        public async Task<IActionResult> SearchMovies([FromQuery] string title)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    string apiKey = _configuration["ApiCredential:ApiKey"];
                    string encodedTitle = Uri.EscapeDataString(title);

                    string apiUrl = $"http://www.omdbapi.com/?apikey={apiKey}&s={encodedTitle}";

                    client.BaseAddress = new Uri("http://www.omdbapi.com/");
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync(apiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string content = await response.Content.ReadAsStringAsync();
                        var searchResults = JsonConvert.DeserializeObject<SearchResults>(content);
                        var searchQuery = new SearchQuery() { QueryName = title };
                        await _movieContext.SearchQueries.AddAsync(searchQuery);
                        await _movieContext.SaveChangesAsync();
                        return Ok(searchResults);
                    }
                    else
                    {
                        return StatusCode((int)response.StatusCode, $"Error: {response.ReasonPhrase}");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Exception: {ex.Message}");
            }
        }




        [HttpGet("latestSearchQueries")]
        public async Task<IActionResult> GetLatestSearchQueries()
        {
            var latestResult = await _movieContext.SearchQueries
                .OrderByDescending(sq => sq.CreatedAt).Take(5).
                ToListAsync();
            return Ok(latestResult);
        }




        [HttpGet("details")]
        public async Task<IActionResult> GetMovieDetailsByTitle([FromQuery] string title)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    string apiKey = _configuration["ApiCredential:ApiKey"];

                    string encodedTitle = Uri.EscapeDataString(title);

                    string apiUrl = $"http://www.omdbapi.com/?apikey={apiKey}&t={encodedTitle}";

                    client.BaseAddress = new Uri("http://www.omdbapi.com/");
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.GetAsync(apiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string content = await response.Content.ReadAsStringAsync();
                        var movieDetails = JsonConvert.DeserializeObject<MovieResult>(content);
                        return Ok(movieDetails);
                    }
                    else
                    {
                        return StatusCode((int)response.StatusCode, $"Error: {response.ReasonPhrase}");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Exception: {ex.Message}");
            }
        }

    }
}
