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
// src folder javascript
app.use('/src', express.static(__dirname + '/src'));


// jobs endpoint json file 
const jobs = require('./assets/jobs.json');
app.get('/jobs', (req, res) => {
    res.json(jobs);
});
  
// View details endpoint
app.get('/pdf/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'assets', 'pdf_files', fileName);
  
    // Set the appropriate content type for PDF files
    res.contentType('application/pdf');
  
    // Send the PDF file
    res.sendFile(filePath);
  });
  

// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
}
);