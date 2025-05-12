document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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

    setActiveLink();

    function addEntranceAnimations() {
        const logo = document.querySelector('.logo');
        
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-20px)';
        });
        
        setTimeout(() => {
            logo.style.transition = 'all 0.5s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 200);

        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }

    addEntranceAnimations();

    const solutionCards = document.querySelectorAll('.solution-card');
    const solutionBg = document.querySelector('.solution-bg');
    const solutionsSlider = document.querySelector('.solutions-slider');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    const placeholderBackgrounds = [
        'linear-gradient(135deg, #2a2a2a 0%, #434343 100%)',
        'linear-gradient(135deg, #0e7490 0%, #06b6d4 100%)',
        'linear-gradient(135deg, #2a2a2a 0%, #555555 100%)',
        'linear-gradient(135deg, #115e6e 0%, #0e7490 100%)'
    ];
    
    solutionCards.forEach((card, index) => {
        const bgImage = card.getAttribute('data-bg');
    
        card.addEventListener('mouseenter', function () {
            card.style.backgroundImage = `url(${bgImage})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';

            solutionBg.style.backgroundImage = `url(${bgImage})`;
            solutionBg.style.opacity = '0.15';

            card.querySelector('h3').style.color = '#fff';
            const para = card.querySelector('p');
            if (para) para.style.color = '#fff';
        });
    
        card.addEventListener('mouseleave', function () {
            card.style.backgroundImage = '';

            solutionBg.style.opacity = '0';

            card.querySelector('h3').style.color = '';
            const para = card.querySelector('p');
            if (para) para.style.color = '';
        });
    });
    
    let scrollAmount = 0;
    const cardWidth = 300; 
    
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

    const featureItems = document.querySelectorAll('.feature-item');
    
    function checkIfInView() {
        featureItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );
            
            if (isInView && !item.classList.contains('animate')) {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            }
        });
    }
    
    checkIfInView();

    window.addEventListener('scroll', function() {
        checkIfInView();
    });

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