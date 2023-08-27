const express = require('express');
const router = express.Router();

const jobs = require('../public/assets/jobs.json');
const { getJobs } = require('../public/src/api/endpoint_getJobs.js');

router.get('/', getJobs(jobs));

module.exports = router;