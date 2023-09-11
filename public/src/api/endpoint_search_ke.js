const Search_jobs_Ke = (jobs) => (req,res) => {
    console.log("Search underway..")
    const searchQuery = req.query.title; // Get the search query from the request query parameters
    let searchResults = jobs; // Initialize with all jobs if no search query is provided
    try {
        if (searchQuery) {
            searchResults = jobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
          }
          console.log("SEARCH successfull: ",searchQuery)
          res.status(200).json(searchResults);
    }
    catch(error){
        res.status(500).json({message: "Error excecuting search"});
    }
}
module.exports = { Search_jobs_Ke };