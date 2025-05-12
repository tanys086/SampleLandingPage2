document.addEventListener('DOMContentLoaded', function() {
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

    const jobCards = document.querySelectorAll('.job-card');
    const toggleButtons = document.querySelectorAll('.toggle-details');
    
    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const jobCard = jobCards[index];

            if (jobCard.classList.contains('active')) {
                jobCard.classList.remove('active');
                button.textContent = 'View Details';

                setTimeout(() => {
                    jobCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                jobCards.forEach(card => {
                    card.classList.remove('active');
                });
                
                toggleButtons.forEach(btn => {
                    btn.textContent = 'View Details';
                });

                jobCard.classList.add('active');
                button.textContent = 'Hide Details';

                setTimeout(() => {
                    jobCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });
    
    const departmentFilter = document.getElementById('department-filter');
    const locationFilter = document.getElementById('location-filter');
    
    function filterJobs() {
        const selectedDepartment = departmentFilter.value;
        const selectedLocation = locationFilter.value;
        
        jobCards.forEach(card => {
            const cardDepartment = card.getAttribute('data-department');
            const cardLocation = card.getAttribute('data-location');

            const matchesDepartment = selectedDepartment === 'all' || cardDepartment === selectedDepartment;
            const matchesLocation = selectedLocation === 'all' || cardLocation === selectedLocation;
            
            if (matchesDepartment && matchesLocation) {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.display = 'none';
            }

            card.classList.remove('active');
            const button = card.querySelector('.toggle-details');
            if (button) {
                button.textContent = 'View Details';
            }
        });

        checkNoResults();
    }
    
    function checkNoResults() {
        let hasVisibleJobs = false;
        
        jobCards.forEach(card => {
            if (card.style.display !== 'none') {
                hasVisibleJobs = true;
            }
        });

        let noResultsEl = document.getElementById('no-jobs-message');
        if (!noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.id = 'no-jobs-message';
            noResultsEl.className = 'no-results';
            noResultsEl.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>No positions found</h3>
                    <p>We couldn't find any positions matching your criteria.</p>
                    <button id="reset-filters" class="btn-secondary">Reset Filters</button>
                </div>
            `;

            const jobListings = document.querySelector('.job-listings');
            jobListings.parentNode.insertBefore(noResultsEl, jobListings.nextSibling);

            document.getElementById('reset-filters').addEventListener('click', resetFilters);
        }

        noResultsEl.style.display = hasVisibleJobs ? 'none' : 'block';
    }
    
    function resetFilters() {
        departmentFilter.value = 'all';
        locationFilter.value = 'all';
        filterJobs();
    }

    if (departmentFilter && locationFilter) {
        departmentFilter.addEventListener('change', filterJobs);
        locationFilter.addEventListener('change', filterJobs);
    }

    const style = document.createElement('style');
    style.textContent = `
        .no-results {
            display: none;
            padding: 40px 0;
            text-align: center;
        }
        
        .no-results-content {
            max-width: 400px;
            margin: 0 auto;
            padding: 30px;
            background-color: var(--light-color);
            border-radius: 10px;
            box-shadow: var(--box-shadow);
        }
        
        .no-results i {
            font-size: 40px;
            color: var(--primary-color);
            opacity: 0.5;
            margin-bottom: 15px;
        }
        
        .no-results h3 {
            font-size: 1.4rem;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .no-results p {
            margin-bottom: 20px;
            color: var(--text-light);
        }
        
        .btn-secondary {
            display: inline-block;
            padding: 10px 20px;
            background-color: transparent;
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
            border-radius: 30px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .btn-secondary:hover {
            background-color: var(--primary-color);
            color: var(--light-color);
        }
    `;
    document.head.appendChild(style);
    
    filterJobs();
});