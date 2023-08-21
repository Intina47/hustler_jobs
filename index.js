const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

// jobs endpoint json file 
const jobs = require('./public/assets/jobs.json');

app.get('/jobs', (req, res) => {
  console.log("______________traffic......")
  res.setHeader('Content-Type', 'application/json');
  res.json(jobs);
});
// View details endpoint
app.get('/pdf/:fileName', (req, res) => {
  console << "System Request!"
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '..','assets', 'pdf_files', fileName);
    fs.stat(filePath, function(err){
      if (err == null) {
        console.log('File exists');
        // Set the appropriate content type for PDF files
        res.contentType('application/pdf');
        // Send the PDF file
        console.log("------------------Loading file--------------: ", filePath);
        res.sendFile(filePath);
      } else if (err.code === 'ENOENT') {
        console.log('File does not exist');
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