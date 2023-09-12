const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { spawn } = require('child_process');

app.use(express.static(path.join(__dirname, 'public')));

const jobsRouter = require('./routes/jobs');
const jobDetailsRouter = require('./routes/jobDetails');
const searchPdfRouter = require('./routes/searchKe');
// kenyan pdf jobs endpoint
app.use('/jobs', jobsRouter);
// View kenyan job details endpoint
app.use('/pdf', jobDetailsRouter);
// search kenyan pdf job files
app.use('/search', searchPdfRouter)

app.get('/ukJobs', (req, res) => {
    const jobTitle = req.query.jobTitle;
    const location = req.query.location;
    console.log("JOBTITTLE: ", jobTitle);
    console.log("LOCATION: ", location);

    console.log('Spawnning endpoint .....');
    const pythonProcess = spawn('python', ['./scrapper/ukJobs.py', jobTitle, location]);
    console.log('Endpoint spawned succesfully.');
    let scrapedData = '';

    pythonProcess.stdout.on('data', (data) => {
        scrapedData += data.toString();
    });
    
    pythonProcess.on('close', (code) => {
        console.log('Python Process closed with code:', code);
        console.log('Final SCRAPPED DATA: ', scrapedData);
    
        if (code === 0) {
            try {
                const parseData = JSON.parse(scrapedData);
                res.json(parseData);
            } catch (error) {
                console.error('JSON Parsing Error:', error);
                res.status(500).json({ message: "Error parsing scraped data as JSON" });
            }
        } else {
            res.status(500).json({ message: "Error running the python script" });
        }
    })
    
})
// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
}
);