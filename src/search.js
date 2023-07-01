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

      var jobLink = document.createElement('a');
    jobLink.className = 'job-link';
    jobLink.textContent = 'View Details';
    jobLink.addEventListener('click', function() {
      fetch(`/pdf/${encodeURIComponent(job.file_name)}`)
        .then(function(response) {
          return response.blob();
        })
        .then(function(blob) {
          // Create a temporary URL for the blob object
          var fileUrl = URL.createObjectURL(blob);
          // Open the file in a new tab/window
          window.open(fileUrl);
        });
    });

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
