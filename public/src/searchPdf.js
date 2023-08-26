const searchPdfKE = (jobs) => (req,res) => {
    console.log("Search underway..")
    const searchQuery = req.query.title; // Get the search query from the request query parameters
    let searchResults = jobs; // Initialize with all jobs if no search query is provided
    if (searchQuery) {
      searchResults = jobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    console.log("SEARCH successfull")
    res.json(searchResults); // Return the search results as JSON to the client
}
module.exports = { searchPdfKE };