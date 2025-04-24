document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-links a');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Change navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    function setActiveLink() {
        const currentLocation = window.location.pathname;
        
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentLocation.includes(linkPath) && linkPath !== '#') {
                link.classList.add('active');
            } else if (currentLocation === '/' && linkPath === 'index.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initial call to set active link
    setActiveLink();

    // Add subtle animations to the navbar elements
    function addEntranceAnimations() {
        const logo = document.querySelector('.logo');
        
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-20px)';
        });
        
        // Animate logo
        setTimeout(() => {
            logo.style.transition = 'all 0.5s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 200);
        
        // Animate links with staggered delay
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }

    // Call the entrance animations
    addEntranceAnimations();

    // Initialize solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    const solutionBg = document.querySelector('.solution-bg');
    const solutionsSlider = document.querySelector('.solutions-slider');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    // Set background images for cards (in a real implementation, these would be your actual images)
    const placeholderBackgrounds = [
        'linear-gradient(135deg, #2a2a2a 0%, #434343 100%)',
        'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
        'linear-gradient(135deg, #2a2a2a 0%, #555555 100%)',
        'linear-gradient(135deg, #115e6e 0%, #0e7490 100%)'
    ];
    
    // Assign placeholder backgrounds to cards
    solutionCards.forEach((card, index) => {
        const bgImage = card.getAttribute('data-bg');
    
        card.addEventListener('mouseenter', function () {
            // 1. Show background image on the card
            card.style.backgroundImage = `url(${bgImage})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
    
            // 2. Update the section background as well
            solutionBg.style.backgroundImage = `url(${bgImage})`;
            solutionBg.style.opacity = '0.15';
    
            // Optional: enhance readability
            card.querySelector('h3').style.color = '#fff';
            const para = card.querySelector('p');
            if (para) para.style.color = '#fff';
        });
    
        card.addEventListener('mouseleave', function () {
            // 1. Clear card background
            card.style.backgroundImage = '';
    
            // 2. Fade out section background
            solutionBg.style.opacity = '0';
    
            // Reset text color
            card.querySelector('h3').style.color = '';
            const para = card.querySelector('p');
            if (para) para.style.color = '';
        });
    });
    
    // Slider Navigation
    let scrollAmount = 0;
    const cardWidth = 300; // Approximate width of each card including margins
    
    nextArrow.addEventListener('click', function() {
        scrollAmount += cardWidth;
        if (scrollAmount > solutionsSlider.scrollWidth - solutionsSlider.clientWidth) {
            scrollAmount = solutionsSlider.scrollWidth - solutionsSlider.clientWidth;
        }
        solutionsSlider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    prevArrow.addEventListener('click', function() {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        solutionsSlider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Animate features on scroll
    const featureItems = document.querySelectorAll('.feature-item');
    
    function checkIfInView() {
        featureItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (isInView && !item.classList.contains('animate')) {
                // Add delay based on index
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            }
        });
    }
    
    // Initial check on load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        checkIfInView();
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero background parallax effect
    const heroSection = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) {
            const scrollPosition = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (heroSection.offsetTop + heroSection.offsetHeight > scrollPosition) {
                heroBg.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
            }
        }
    });
});