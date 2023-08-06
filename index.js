// express
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// middleware to parse JSON request body and URL parameters. This is required for parsing the data sent

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'))
// routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
// css
app.use('/css', express.static(__dirname + '/css'));

// assets folder
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/src', express.static(__dirname + '/src'));

// jobs endpoint json file 
const jobs = require('./assets/jobs.json');
app.get('/jobs', (req, res) => {
  console.log("______________traffic......")
    res.json(jobs);
});
  
// View details endpoint
app.get('/pdf/:fileName', (req, res) => {
  console << "System Request!"
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'assets', 'pdf_files', fileName);
  
    // Set the appropriate content type for PDF files
    res.contentType('application/pdf');
  
    // Send the PDF file
    console.log("------------------Loading--------------: ", fileName);
    res.sendFile(filePath);
  });

//   search
app.get('/search', (req, res) => {
  console.log("Search underway..")
    const jobs = require('./assets/jobs.json');
  
    const searchQuery = req.query.title; // Get the search query from the request query parameters
    
    // Perform search logic based on the search query
    // This can involve filtering the jobs array based on the title
    
    let searchResults = jobs; // Initialize with all jobs if no search query is provided
    
    if (searchQuery) {
      searchResults = jobs.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  
    console.log("SEARCH successfull")
    res.json(searchResults); // Return the search results as JSON to the client
  });
  

// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
}
);