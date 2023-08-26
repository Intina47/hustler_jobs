                // Toggle dark mode
                var darkModeToggle = document.getElementById('darkModeToggle');
                var toggleIcon = document.getElementById('toggleIcon');
        
                darkModeToggle.addEventListener('change', function () {
                    if (this.checked) {
                        document.body.classList.add('dark-mode');
                        toggleIcon.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Moon icon
                    } else {
                        document.body.classList.remove('dark-mode');
                        toggleIcon.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Sun icon
                    }
                });

// make the bar sticky
window.addEventListener('scroll', function() {
    var stickyElement = document.querySelector('.sticky');
    var stickyElementTop = stickyElement.getBoundingClientRect().top;
    
    if (stickyElementTop === 0) {
        stickyElement.classList.add('sticky-background');
    } else {
        stickyElement.classList.remove('sticky-background');
    }
});