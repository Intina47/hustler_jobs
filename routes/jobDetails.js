const express = require('express');
const router = express.Router();

const { getJobDetails } = require('../public/src/api/endpoint_getJobDetails');

router.get('/:fileName', getJobDetails);

module.exports = router;