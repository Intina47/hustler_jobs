// display the jobs divs conditionally (kenyan div and uk div)
document.addEventListener("DOMContentLoaded", function() {
    const kenyanJoblistingsDiv = document.getElementById("jobListings");
    const ukJoblistingsDiv = document.getElementById("uk-jobListings");
    const companyElement = document.querySelector(".company-name");
    const searchInput = document.querySelector(".searchInput");
  
    // Show the Kenyan job listings by default
    searchInput.id = "searchKE";
    ukJoblistingsDiv.style.display = "none";
    kenyanJoblistingsDiv.style.display = "block";
  
    const locationButtons = document.querySelectorAll(".location-tag");
  
    locationButtons.forEach(button => {
      button.addEventListener("click", function() {
        const chosenLocation = this.textContent;
        companyElement.textContent = chosenLocation;
        
        // Set the id of companyElement to the id of the clicked tag
        companyElement.id = this.id;
  
        // access companyElement.id here
        const locationId = companyElement.id;
        console.log("Location ID: ", locationId);
  
        if (locationId === "254") {
          searchInput.id = "searchKE";
          ukJoblistingsDiv.style.display = "none";
          kenyanJoblistingsDiv.style.display = "block";
        } else if (locationId === "44") {
          searchInput.id = "searchUK";
          ukJoblistingsDiv.style.display = "block";
          kenyanJoblistingsDiv.style.display = "none";
        } else {
          searchInput.id = "searchKE";
          ukJoblistingsDiv.style.display = "none";
          kenyanJoblistingsDiv.style.display = "block";
        }
      });
    });
  });
  