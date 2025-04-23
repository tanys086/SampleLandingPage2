// About page specific JavaScript - Include after loading script.js

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
    
    // Counter animation for statistics
    const countElements = document.querySelectorAll('.count-up');
    
    function animateCount(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16)); // 60fps approx
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                element.textContent = target;
            } else {
                element.textContent = current;
            }
        }, 16);
    }
    
    function checkCounters() {
        countElements.forEach(counter => {
            const counterTop = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (counterTop < windowHeight * 0.85 && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCount(counter);
            }
        });
    }
    
    // Check counters on scroll
    window.addEventListener('scroll', checkCounters);
    
    // Initial check for counters
    checkCounters();
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const targetTab = this.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.testimonial-arrow.prev');
    const nextArrow = document.querySelector('.testimonial-arrow.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected slide
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Initial setup
    showSlide(0);
    
    // Previous button
    prevArrow.addEventListener('click', function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = testimonialItems.length - 1;
        showSlide(newIndex);
    });
    
    // Next button
    nextArrow.addEventListener('click', function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialItems.length) newIndex = 0;
        showSlide(newIndex);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto-advance slides
    let slideInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialItems.length) newIndex = 0;
        showSlide(newIndex);
    }, 6000);
    
    // Pause auto-advance on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            let newIndex = currentSlide + 1;
            if (newIndex >= testimonialItems.length) newIndex = 0;
            showSlide(newIndex);
        }, 6000);
    });
});