document.addEventListener("DOMContentLoaded", function() {
    const companyElement = document.querySelector(".company-name");
    const locationButtons = document.querySelectorAll(".location-tag");
  
    locationButtons.forEach(button => {
      button.addEventListener("click", function() {
        const chosenLocation = this.textContent;
        companyElement.textContent = chosenLocation;
        // make the id of company element that of the clicked tag
        // companyElement.id = this.id;
      });
    });
  });