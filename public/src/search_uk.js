var locationID = document.getElementById('44');
// if location id == 44 then get the searchbtn
if (locationID) {
  var searchbtn = document.getElementById('search-Uk-btn');
} else {
  console.log("We are still in kenya");
}
searchbtn.addEventListener('click', function(event) {
  console.log('Icon clicked');
  // get the job title input element
  const jobTitleInput = document.getElementById('jobTitle');
  const jobLocation = document.getElementById('location');
  // prevent automatic submision
  event.preventDefault();
  const jobTitle = jobTitleInput.value;
  const location = jobLocation.value;
  console.log('JOBTITTLE: ', jobTitle);
  console.log('LOCATION: ', location);
  // fetch the data from the server
  fetch('/ukJobs?jobTitle=' + jobTitle + '&location=' + location)
  .then(function(response) {
    console.log('Response Status: ', response.status);
    if(response.ok && response.headers.get('content-type').includes('application/json')) {
      return response.json();
    } else {
      throw new Error('UK-Invalid response or content type is not JSON');
    }
  })
  .then(function(searchResults) {
    console.log('UK-Search Results: ', searchResults);
    displaySearchResults(searchResults);
  })
  .catch(function(error) {
    console.log('UK-Error: ', error.message);
  });
})

function displaySearchResults(searchResults) {
  var searchResultsContainer = document.getElementById('uk-jobListings');
  searchResultsContainer.innerHTML = '';

  if (searchResults && searchResults.length > 0) {
    searchResults.forEach(function(job) {
      var jobListing = document.createElement('article');
      jobListing.className = 'job-listing';

      var jobTitle = document.createElement('h2');
      jobTitle.className = 'job-title';
      jobTitle.textContent = job.title;

      var companyName = document.createElement('h3');
      companyName.className = 'company-name';
      companyName.textContent = job.company_location;

      var salary = document.createElement('p');
      salary.className = 'salary';
      salary.textContent = job.salary;

      var jobDescription = document.createElement('p');
      jobDescription.className = 'job-description';
      jobDescription.textContent = job.description;

    jobListing.appendChild(jobTitle);
    // jobListing.appendChild(companyName);
    jobListing.appendChild(salary);
    jobListing.appendChild(jobDescription);

    searchResultsContainer.appendChild(jobListing);
    });
  } else {
    var noResults = document.createElement('p');
    noResults.className = 'no-results';
    noResults.textContent = 'No jobs found matching your search criteria';
    searchResultsContainer.appendChild(noResults);
  }
}
