document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('submission-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const answer = document.getElementById('answer').value.trim();
            
            if (!name || !email || !subject || !message || !answer) {
                alert('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            showModal();

            contactForm.reset();
        });
    }

    function showModal() {
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    setupCaptcha();
});

function refreshCaptcha() {
    alert('Captcha refresh functionality would be implemented here.');

    const captchaMessage = document.querySelector('.captcha-message');
    const originalMessage = captchaMessage.textContent;
    
    captchaMessage.textContent = 'Refreshing CAPTCHA...';

    setTimeout(() => {
        captchaMessage.textContent = originalMessage;
    }, 1000);
}
function setupCaptcha() {

}

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