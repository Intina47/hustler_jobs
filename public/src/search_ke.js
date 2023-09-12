// kenyan jobs search 
document.addEventListener("DOMContentLoaded", function() {
var searchInput = document.getElementById('searchKE');

searchInput.addEventListener('input', function() {
  var searchQuery = searchInput.value;
  fetch(`/search?title=${encodeURIComponent(searchQuery)}`)
  .then(function(response) {
    console.log('Respnse Status: ', response.status);
    if(response.ok && response.headers.get('content-type').includes('application/json')) {
      return response.json();
    } else {
      throw new Error('KE-Invalid response or content type is not JSON');
    }
  })
  .then(function(searchResults) {
    displaySearchResults(searchResults);
  })
  .catch(function(error) {
    console.log('KE-Error: ', error.message);
  });
})

function displaySearchResults(searchResults) {
  var searchResultsContainer = document.getElementById('jobListings');
  searchResultsContainer.innerHTML = '';

  if (searchResults && searchResults.length > 0) {
    searchResults.forEach(function(job) {
      var jobListing = document.createElement('div');
      jobListing.className = 'job-listing';

      var jobTitle = document.createElement('div');
      jobTitle.className = 'job-title';
      jobTitle.textContent = job.title;

      var jobLink = document.createElement('a');
      jobLink.className = 'job-link';
      jobLink.textContent = 'View Details';
      jobLink.href = `/pdf/${encodeURIComponent(job.file_name)}`; 

    jobListing.appendChild(jobTitle);
    jobListing.appendChild(jobLink);

    searchResultsContainer.appendChild(jobListing);
    });
  } else {
    var noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = 'No results found.';
    searchResultsContainer.appendChild(noResultsMessage);
  }
}
});