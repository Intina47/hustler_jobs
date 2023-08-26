let lastJobIndexSent = -1; //indicates no jobs have been sent
// jobController.js
const getJobs = (jobs) => (req, res) => {
    // parse query parameters
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
  
    // calculate the start and the end index for the current page
    const startIndex = lastJobIndexSent + 1;
    const endIndex = startIndex + perPage - 1;
  
    if (startIndex >= jobs.length) {
      return res.status(200).json({ jobs: [], currentPage: page, totalPages: 0 });
    }
  
    // slice the jobs array to get the jobs for the current page
    const jobsForPage = jobs.slice(startIndex, Math.min(endIndex, jobs.length - 1));
    lastJobIndexSent = endIndex;
  
    // prepare response data and send error code if an error occurs
    try {
      const responseData = {
        jobs: jobsForPage,
        currentPage: page,
        totalPages: Math.ceil(jobs.length / perPage),
      };
      res.setHeader('Content-Type', 'application/json');
      res.json(responseData);
    } catch (err) {
      console.log('An error occurred accessing jobs', err);
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports = { getJobs };
  