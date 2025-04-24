// Solutions page specific JavaScript - Include after loading script.js

document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const delay = element.getAttribute('data-delay') || 0;
            
            if (elementTop < windowHeight * 0.85) {
                setTimeout(() => {
                    element.classList.add('in-view');
                }, delay);
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Healthcare Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabsContainer = this.closest('.solution-tabs') || document;
            
            // Remove active class from all buttons and panes in this container
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            tabsContainer.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const targetTab = this.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Check if URL has hash on load and scroll to it
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500); // Small delay to ensure page is fully loaded
        }
    }
    
    // Agriculture Carousel functionality
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevArrow = document.querySelector('.carousel-arrow.prev');
    const nextArrow = document.querySelector('.carousel-arrow.next');
    let currentSlide = 0;
    
    if (carouselSlides.length > 0) {
        function showSlide(index) {
            // Hide all slides
            carouselSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show selected slide
            carouselSlides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }
        
        // Previous button
        if (prevArrow) {
            prevArrow.addEventListener('click', function() {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = carouselSlides.length - 1;
                showSlide(newIndex);
            });
        }
        
        // Next button
        if (nextArrow) {
            nextArrow.addEventListener('click', function() {
                let newIndex = currentSlide + 1;
                if (newIndex >= carouselSlides.length) newIndex = 0;
                showSlide(newIndex);
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto-advance slides
        let slideInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= carouselSlides.length) newIndex = 0;
            showSlide(newIndex);
        }, 5000);
        
        // Pause auto-advance on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            carouselContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    let newIndex = currentSlide + 1;
                    if (newIndex >= carouselSlides.length) newIndex = 0;
                    showSlide(newIndex);
                }, 5000);
            });
        }
    }
    
    // Highlight active nav link based on section in view
    const sectionIds = ['fintech', 'healthcare', 'industrial', 'supply-chain', 'agriculture'];
    const sections = sectionIds.map(id => document.getElementById(id));
    const navLinks = document.querySelectorAll('.industry-pill');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach((section, index) => {
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionIds[index]}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }
    
    // Initial check and add scroll listener
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);
    
    // Add active class to industry pills
    document.querySelectorAll('.industry-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            document.querySelectorAll('.industry-pill').forEach(p => {
                p.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Add hover effects for solutions
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
});