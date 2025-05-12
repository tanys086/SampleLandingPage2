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

    checkScroll();

    window.addEventListener('scroll', checkScroll);

    const countElements = document.querySelectorAll('.count-up');
    
    function animateCount(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
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

    window.addEventListener('scroll', checkCounters);

    checkCounters();

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');

            const targetTab = this.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.testimonial-arrow.prev');
    const nextArrow = document.querySelector('.testimonial-arrow.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    showSlide(0);

    prevArrow.addEventListener('click', function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = testimonialItems.length - 1;
        showSlide(newIndex);
    });

    nextArrow.addEventListener('click', function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialItems.length) newIndex = 0;
        showSlide(newIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    let slideInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialItems.length) newIndex = 0;
        showSlide(newIndex);
    }, 6000);

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