// Initialize counters on page load
let visitCount = 0;
let apiCallCount = 0;

// Animate numbers counting up
function animateCounter(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Initialize page visit counter
function initVisitCounter() {
    // Get or initialize visit count from localStorage
    visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    visitCount++;
    localStorage.setItem('visitCount', visitCount.toString());

    const visitElement = document.getElementById('visit-count');
    animateCounter(visitElement, visitCount);
}

// Test API function
async function testApi() {
    const responseElement = document.getElementById('response-content');
    const loadingElement = document.getElementById('loading');
    const apiResponseElement = document.getElementById('api-response');

    // Show loading state
    loadingElement.style.display = 'block';
    apiResponseElement.style.display = 'none';

    try {
        // Make API request
        const response = await fetch('/api/hello');
        const data = await response.json();

        // Format the response
        const formattedResponse = JSON.stringify(data, null, 2);

        // Update API call counter
        apiCallCount++;
        const apiCountElement = document.getElementById('api-calls');
        animateCounter(apiCountElement, apiCallCount);

        // Show response after a short delay (for effect)
        setTimeout(() => {
            loadingElement.style.display = 'none';
            apiResponseElement.style.display = 'block';
            responseElement.textContent = formattedResponse;

            // Add success animation
            apiResponseElement.style.animation = 'none';
            setTimeout(() => {
                apiResponseElement.style.animation = 'fadeInUp 0.5s ease';
            }, 10);
        }, 500);

    } catch (error) {
        // Handle errors
        loadingElement.style.display = 'none';
        apiResponseElement.style.display = 'block';
        responseElement.textContent = `Error: ${error.message}`;
        responseElement.style.color = '#ef4444';
    }
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Initialize visit counter
    initVisitCounter();

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Add hover effect to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add keyboard shortcut for API test (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            testApi();
            // Scroll to demo section
            document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Log welcome message to console
    console.log('%c🚀 Welcome to Actix-Web Demo!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cTip: Press Ctrl+K (or Cmd+K on Mac) to quickly test the API!', 'color: #8b5cf6;');
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Make testApi available globally
window.testApi = testApi;
