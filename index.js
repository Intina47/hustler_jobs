const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

// jobs endpoint json file 
const jobs = require('./public/assets/jobs.json');
let lastJobIndexSent = -1; //indicates no jobs have been sent

app.get('/jobs', (req, res) => {
  // parse query parameters
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  // calculate the start and the end index for the current page
  const startIndex = lastJobIndexSent + 1;
  const endIndex = startIndex + perPage - 1;

  if(startIndex >= jobs.length){
    return res.status(200).json({jobs: [], currentPage: page, totalPages: 0});
  }

  //slice the jobs array to get the jobs for the current page
  const jobsForPage = jobs.slice(startIndex, Math.min(endIndex, jobs.length - 1));
  lastJobIndexSent = endIndex;

  // prepare response data and send error code if an error occurs
  try{
    const responseData = {
      jobs: jobsForPage,
      currentPage: page,
      totalPages: Math.ceil(jobs.length / perPage)
    };
    res.setHeader('Content-Type', 'appplication/json');
    res.json(responseData);
  }
  catch(err){
    console.log('An error occured accessing jobs', err);
    res.status(500).json({message: err.message});
  }

});
// View details endpoint
app.get('/pdf/:fileName', (req, res) => {
  console << "System Request!"
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'public','assets', 'pdf_files', fileName);
    fs.stat(filePath, function(err){
      if (err == null) {
        console.log('File exists');
        // Set the appropriate content type for PDF files
        res.contentType('application/pdf');
        // Send the PDF file
        console.log("------------------Loading file--------------: ", filePath);
        res.sendFile(filePath);
      } else if (err.code === 'ENOENT') {
        console.log(fileName, ' does not exist');
        res.status(404).send('File not found');
      } else {
        console.log('Some other error: ', err.code);
        throw new Error(`Error ${err}`);
      }
    });

  });
//   search
app.get('/search', (req, res) => {
  console.log("Search underway..")
    const searchQuery = req.query.title; // Get the search query from the request query parameters
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