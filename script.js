// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// Page transitions
window.addEventListener('beforeunload', () => {
    document.body.classList.add('page-transition');
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Dynamic year in footer
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', new Date().getFullYear());
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Skill bar animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    const percentages = document.querySelectorAll('.skill-percentage');
    
    // Initialize all bars to 0% width
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });

    // Function to animate a single skill bar
    function animateSkillBar(bar, percentage) {
        const level = parseInt(bar.getAttribute('data-level'));
        let currentPercent = 0;
        
        // Reset percentage display
        percentage.textContent = '0%';
        percentage.classList.add('visible');
        
        // Animate the percentage number
        const percentInterval = setInterval(() => {
            if (currentPercent <= level) {
                percentage.textContent = currentPercent + '%';
                currentPercent++;
            } else {
                clearInterval(percentInterval);
            }
        }, 15);

        // Animate the progress bar
        bar.style.width = level + '%';
    }

    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const card = bar.closest('.skill-card');
                const percentage = card.querySelector('.skill-percentage');
                animateSkillBar(bar, percentage);
            }
        });
    }, { threshold: 0.5 });

    // Observe each skill bar
    skillBars.forEach(bar => observer.observe(bar));

    // Add click event to re-trigger animation
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            const bar = card.querySelector('.skill-level');
            const percentage = card.querySelector('.skill-percentage');
            
            // Reset the animation
            bar.style.width = '0%';
            percentage.classList.remove('visible');
            
            // Force a reflow
            void bar.offsetWidth;
            
            // Trigger the animation again
            setTimeout(() => {
                animateSkillBar(bar, percentage);
            }, 50);
        });
    });
}

// Initialize skill bars when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSkillBars);

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Skill bar animation on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const barBottom = bar.getBoundingClientRect().bottom;
        
        if (barTop >= 0 && barBottom <= window.innerHeight) {
            bar.style.width = bar.getAttribute('data-level');
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('resize', animateSkillBars);

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const tooltipText = e.target.getAttribute('data-tooltip');
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltipText;
        document.body.appendChild(tooltipEl);
        
        const rect = e.target.getBoundingClientRect();
        tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
        tooltipEl.style.left = `${rect.left + (rect.width/2) - (tooltipEl.offsetWidth/2)}px`;
    });
    
    tooltip.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
}); 