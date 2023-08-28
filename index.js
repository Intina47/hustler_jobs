const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const RateLimit = require('express-rate-limit');
var limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);

const { getJobs } = require('./public/src/jobController.js');
const { getJobDetails } = require('./public/src/jobDetailsController.js');
const { searchPdfKE } = require('./public/src/searchPdf.js');

// jobs endpoint json file 
const jobs = require('./public/assets/jobs.json');

app.get('/jobs', getJobs(jobs));
// View details endpoint
app.get('/pdf/:fileName', getJobDetails);
//   search kenyan pdf job files
app.get('/search', searchPdfKE(jobs))
// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});