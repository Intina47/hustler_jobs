//load more button
const loadMoreButton = document.createElement('button');
loadMoreButton.textContent = 'Load More';
loadMoreButton.classList.add('load-more-button');
loadMoreButton.addEventListener('click', function() {
fetchJobs(currentPage + 1);
});
  //load jobs from jobs.json
  let currentPage = 1;
  function fetchJobs(page){
    fetch(`/jobs?page=${page}`)
    .then(function(response){
      return response.json();
    })
    .catch(function(error){
      console.log('Sorry an error occured\n',error);
    })
    .then(function(jobsData){
      if (jobsData.length === 0) {
        loadMoreButton.style.display = 'none';
        return;
      }
      
      displayJobs(jobsData.jobs);
      currentPage = jobsData.currentPage;

      if (currentPage >= jobsData.totalPages) {
        loadMoreButton.style.display = 'none';
      }else{
        loadMoreButton.style.display = 'block';
      }
    });
  }
//fetch the initial page of jobs
fetchJobs(currentPage);

function displayJobs(jobs) {
var jobListingsContainer = document.getElementById('jobListings');
jobs.forEach(function(job) {
var jobListing = document.createElement('div');
jobListing.className = 'job-listing';

var jobTitle = document.createElement('div');
jobTitle.className = 'job-title';
jobTitle.textContent = job.title;

var jobLink = document.createElement('a');
jobLink.className = 'job-link';
jobLink.textContent = 'View Details';
jobLink.href = `/pdf/${encodeURIComponent(job.file_name)}`; // Set the href directly to the PDF URL

jobListing.appendChild(jobTitle);
jobListing.appendChild(jobLink);

jobListingsContainer.appendChild(jobListing);
//append "load more" button to the page
document.getElementById("jobListings").appendChild(loadMoreButton);
});
}