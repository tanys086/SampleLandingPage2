document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    const manufacturerFilters = document.querySelectorAll('.manufacturer-filter');
    
    manufacturerFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            const category = this.getAttribute('data-category');
            const selectedManufacturer = this.value;
            const productCards = document.querySelectorAll(`#${category} .product-card`);
            
            productCards.forEach(card => {
                const cardManufacturer = card.getAttribute('data-manufacturer');
                
                if (selectedManufacturer === 'all' || cardManufacturer === selectedManufacturer) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight - 20,
                    behavior: 'smooth'
                });

                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    const searchInput = document.getElementById('component-search');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.toLowerCase().trim();
                
                if (searchTerm === '') return;
                
                const allProducts = document.querySelectorAll('.product-card');
                let hasMatch = false;
                
                allProducts.forEach(product => {
                    const productName = product.querySelector('h3').textContent.toLowerCase();
                    const productDesc = product.querySelector('.product-description').textContent.toLowerCase();
                    const partNumber = product.querySelector('.part-number').textContent.toLowerCase();

                    product.classList.remove('search-match');
                    
                    if (productName.includes(searchTerm) || 
                        productDesc.includes(searchTerm) || 
                        partNumber.includes(searchTerm)) {
                        
                        product.classList.add('search-match');
                        hasMatch = true;

                        if (!window.firstMatchFound) {
                            window.firstMatchFound = true;

                            let parentSection = product.closest('.product-category');
                            
                            if (parentSection) {
                                const headerHeight = document.querySelector('.navbar').offsetHeight;
                                const targetPosition = parentSection.getBoundingClientRect().top + window.pageYOffset;
                                
                                window.scrollTo({
                                    top: targetPosition - headerHeight - 20,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }
                });

                window.setTimeout(() => {
                    window.firstMatchFound = false;
                }, 1000);

                const searchMessage = document.querySelector('.search-message');
                
                if (!hasMatch) {
                    if (!searchMessage) {
                        const message = document.createElement('div');
                        message.className = 'search-message';
                        message.textContent = `No products found matching "${searchTerm}". Please try another search term or contact us for assistance.`;
                        
                        searchInput.parentNode.insertAdjacentElement('afterend', message);
                    }
                } else {
                    if (searchMessage) {
                        searchMessage.remove();
                    }
                }
            }
        });
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});