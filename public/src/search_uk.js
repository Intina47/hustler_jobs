var searchbtn = document.getElementById('searchbtn');

searchbtn.addEventListener('click', function(event) {
  console.log('Icon clicked');
  // get the job title input element
  const jobTitleInput = document.getElementById('searchUK');
  // prevent automatic submision
  event.preventDefault();
  const jobTitle = jobTitleInput.value;
  console.log('JOBTITTLE: ', jobTitle);

  fetch(`/ukJobs?jobTitle=${encodeURIComponent(jobTitle)}`)
  .then(function(response) {
    console.log('Respnse Status: ', response.status);
    if(response.ok && response.headers.get('content-type').includes('application/json')) {
      return response.json();
    } else {
      throw new Error('UK-Invalid response or content type is not JSON');
    }
  })
  .then(function(searchResults) {
    displaySearchResults(searchResults);
  })
  .catch(function(error) {
    console.log('UK-Error: ', error.message);
  });
})

function displayJobs(jobs) {
    const jobListingsContainer = document.getElementById('uk-jobListings');
    jobListingsContainer.innerHTML = '';
    if (searchResults.length > 0) {
    jobs.forEach(function(job) {
        const jobListing = document.createElement('div');
        jobListing.className = 'job-listing';

        const jobTitle = document.createElement('div');
        jobTitle.className = 'job-title';
        jobTitle.textContent = job.title;

        jobListing.appendChild(jobTitle);

        jobListingsContainer.appendChild(jobListing);
    });
    } else {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.textContent = 'No results found.';
        jobListingsContainer.appendChild(noResultsMessage);
    }

}