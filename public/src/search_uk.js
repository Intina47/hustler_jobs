
const searchUKIcon = document.getElementById('search_icon_UK');

searchUKIcon.addEventListener('click', function() {
    console.log("icon clicked!");
    // get the job title input element
    const jobTitleInput = document.getElementById('searchUK');
    // prevent automatic submission
    event.preventDefault();
    const jobTitle = jobTitleInput.ariaValueMax;
    console.log("JOBTITTLE: ", jobTitle);

    fetch(`/ukJobs?jobTitle=${encodeURIComponent(jobTitle)}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(jobsData) {
        displayJobs(jobsData);
    })
    .catch(function(error) {
        console.log('Sorry an error occured\n', error);
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