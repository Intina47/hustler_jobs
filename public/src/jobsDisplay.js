document.addEventListener("DOMContentLoaded", function() {
    const kenyanJoblistingsDiv = document.getElementById("jobListings");
    const ukJoblistingsDiv = document.getElementById("uk-jobListings");
    const companyElement = document.querySelector(".company-name");
  
    // Show the Kenyan job listings by default
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
          ukJoblistingsDiv.style.display = "none";
          kenyanJoblistingsDiv.style.display = "block";
        } else if (locationId === "44") {
          ukJoblistingsDiv.style.display = "block";
          kenyanJoblistingsDiv.style.display = "none";
        } else {
          ukJoblistingsDiv.style.display = "none";
          kenyanJoblistingsDiv.style.display = "block";
        }
      });
    });
  });
  