const express = require('express');
const router = express.Router();
const jobs = require('../public/assets/jobs.json');
const { Search_jobs_Ke } = require('../public/src/api/endpoint_search_ke.js');

router.get('/', Search_jobs_Ke(jobs));

module.exports = router;