// Contact Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('submission-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const answer = document.getElementById('answer').value.trim();
            
            if (!name || !email || !subject || !message || !answer) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, you would send the form data to the server here
            // using fetch or XMLHttpRequest
            
            // For now, we'll just show the success modal
            showModal();
            
            // Reset form
            contactForm.reset();
        });
    }

    // Show modal function
    function showModal() {
        modal.classList.add('show');
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
    }

    // Close modal event listeners
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal if clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Captcha functionality
    setupCaptcha();
});

// Refresh captcha
function refreshCaptcha() {
    // In a real implementation, this would request a new captcha from the server
    alert('Captcha refresh functionality would be implemented here.');
    
    // For demonstration, we'll change the message temporarily
    const captchaMessage = document.querySelector('.captcha-message');
    const originalMessage = captchaMessage.textContent;
    
    captchaMessage.textContent = 'Refreshing CAPTCHA...';
    
    // Simulate a refresh delay
    setTimeout(() => {
        captchaMessage.textContent = originalMessage;
    }, 1000);
}

// Set up initial captcha (this would normally be handled server-side)
function setupCaptcha() {
    // For demonstration purposes, the captcha is hardcoded as unavailable
    // In a real implementation, this would initialize a captcha challenge
}

// Mobile menu toggle (if not already included in the main script.js)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});