// Client-side code
var searchInput = document.getElementById('searchInput');

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
  var searchResultsContainer = document.getElementById('searchResultsContainer');
  searchResultsContainer.innerHTML = '';

  if (searchResults.length > 0) {
    searchResults.forEach(function(job) {
      var jobListing = document.createElement('div');
      jobListing.className = 'job-listing';

      var jobTitle = document.createElement('div');
      jobTitle.className = 'job-title';
      jobTitle.textContent = job.title;

      jobListing.appendChild(jobTitle);
      searchResultsContainer.appendChild(jobListing);
    });
  } else {
    var noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = 'No results found.';
    searchResultsContainer.appendChild(noResultsMessage);
  }
}
