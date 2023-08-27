const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { spawn } = require('child_process');

app.use(express.static(path.join(__dirname, 'public')));

const jobsRouter = require('./routes/jobs');
const jobDetailsRouter = require('./routes/jobDetails');
const searchPdfRouter = require('./routes/searchKe');
// kenyan jobs json file 
// const jobs = require('./public/assets/jobs.json');
// kenyan job endpoint
app.use('/jobs', jobsRouter);
// View details endpoint (kenya)
app.use('/pdf', jobDetailsRouter);
// search kenyan pdf job files
app.use('/search', searchPdfRouter)

app.get('/ukJobs', (req, res) => {
    const jobTitle = req.query.jobTitle;
    const location = req.query.location;

    const pythonProcess = spawn('python', ['./scrapper/ukJobs.py', jobTitle, location]);
    let scrapedData = '';

    pythonProcess.stdout.on('data', (data) => {
        scrapedData += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            const parseData = JSON.parse(scrapedData);
            res.json(parseData);
        } else {
            res.status(500).json({message: "Error running the python script"});
        }
    })
})
// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
}
);