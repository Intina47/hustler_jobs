// kenyan jobs search 
var searchInput = document.getElementById('searchKE');

searchInput.addEventListener('input', function() {
  var searchQuery = searchInput.value;
  fetch(`/search?title=${encodeURIComponent(searchQuery)}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(searchResults) {
      displaySearchResults(searchResults);
    });
});

function displaySearchResults(searchResults) {
  var searchResultsContainer = document.getElementById('jobListings');
  searchResultsContainer.innerHTML = '';

  if (searchResults.length > 0) {
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
