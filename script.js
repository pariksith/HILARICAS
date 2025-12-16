/* ===================================
   HILARICAS 2025 - Simple & Fast JS
   Optimized for Speed & Smooth Performance
   =================================== */

'use strict';

// ===================================
// Quick DOM Cache
// ===================================
const $ = {
    body: document.body,
    navbar: document.getElementById('navbar'),
    hamburger: document.getElementById('hamburger'),
    navMenu: document.getElementById('navMenu'),
    scrollTop: document.getElementById('scrollTop'),
    preloader: document.getElementById('preloader'),
    readingProgress: document.getElementById('readingProgress'),
    starsContainer: document.getElementById('stars'),
    countdown: document.getElementById('countdown')
};

// ===================================
// Fast Preloader
// ===================================
let loadProgress = 0;
const loadingBar = document.querySelector('.loading-progress');

const updateLoader = () => {
    loadProgress += Math.random() * 30 + 15;
    if (loadProgress > 100) loadProgress = 100;
    
    if (loadingBar) loadingBar.style.width = loadProgress + '%';
    
    if (loadProgress < 100) {
        setTimeout(updateLoader, 100);
    }
};

updateLoader();

window.addEventListener('load', () => {
    setTimeout(() => {
        if ($.preloader) {
            $.preloader.style.opacity = '0';
            setTimeout(() => {
                $.preloader.style.display = 'none';
                $.body.style.overflow = 'visible';
            }, 500);
        }
    }, 1000);
});

$.body.style.overflow = 'hidden';

// ===================================
// Generate Stars - Fast Method
// ===================================
if ($.starsContainer) {
    const fragment = document.createDocumentFragment();
    const starCount = window.innerWidth < 768 ? 50 : 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        fragment.appendChild(star);
    }
    
    $.starsContainer.appendChild(fragment);
}

// ===================================
// Navbar Scroll Effect - Optimized
// ===================================
let lastScroll = 0;
let ticking = false;

const handleScroll = () => {
    const scrollY = window.pageYOffset;
    
    // Navbar
    if (scrollY > 80) {
        $.navbar?.classList.add('scrolled');
    } else {
        $.navbar?.classList.remove('scrolled');
    }
    
    // Reading Progress
    if ($.readingProgress) {
        const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollY / winHeight) * 100;
        $.readingProgress.style.width = Math.min(progress, 100) + '%';
    }
    
    // Scroll to Top Button
    if ($.scrollTop) {
        if (scrollY > 500) {
            $.scrollTop.classList.add('visible');
        } else {
            $.scrollTop.classList.remove('visible');
        }
    }
    
    lastScroll = scrollY;
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// ===================================
// Mobile Menu Toggle
// ===================================
let menuOpen = false;

if ($.hamburger && $.navMenu) {
    $.hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        menuOpen = !menuOpen;
        
        $.hamburger.classList.toggle('active');
        $.navMenu.classList.toggle('active');
        
        // Prevent body scroll on mobile
        if (window.innerWidth < 768) {
            $.body.style.overflow = menuOpen ? 'hidden' : 'visible';
        }
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            $.hamburger.classList.remove('active');
            $.navMenu.classList.remove('active');
            $.body.style.overflow = 'visible';
            menuOpen = false;
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (menuOpen && !$.navMenu.contains(e.target) && !$.hamburger.contains(e.target)) {
            $.hamburger.classList.remove('active');
            $.navMenu.classList.remove('active');
            $.body.style.overflow = 'visible';
            menuOpen = false;
        }
    });
}

// ===================================
// Scroll to Top Button
// ===================================
if ($.scrollTop) {
    $.scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Smooth Anchor Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Stats Counter Animation
// ===================================
const animatedStats = new Set();

const animateNumber = (element, target, duration = 2000) => {
    let start = 0;
    const startTime = performance.now();
    
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    requestAnimationFrame(update);
};

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const count = statNumber?.getAttribute('data-count');
            
            if (count && !animatedStats.has(statNumber)) {
                animatedStats.add(statNumber);
                animateNumber(statNumber, parseInt(count));
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-box').forEach(box => {
    statsObserver.observe(box);
});

// ===================================
// Scroll Reveal Animation
// ===================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '-50px'
});

// Initialize reveal elements
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
});

// ===================================
// Event Category Filtering
// ===================================
const eventCards = document.querySelectorAll('.event-card[data-category]');
const tabButtons = document.querySelectorAll('.tab-btn');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter events
            eventCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// Responsive Handler
// ===================================
let resizeTimer;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close menu on desktop
        if (window.innerWidth > 768 && menuOpen) {
            $.hamburger?.classList.remove('active');
            $.navMenu?.classList.remove('active');
            $.body.style.overflow = 'visible';
            menuOpen = false;
        }
    }, 150);
});

// ===================================
// Copy to Clipboard
// ===================================
const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => showNotification('📋 Copied to clipboard!'))
            .catch(err => console.error('Copy failed:', err));
    }
};

// Add click to copy functionality
document.addEventListener('DOMContentLoaded', () => {
    const copyElements = document.querySelectorAll('.contact-value, .footer-contact li span:last-child');
    
    copyElements.forEach(el => {
        el.style.cursor = 'pointer';
        el.title = 'Click to copy';
        
        el.addEventListener('click', () => {
            const text = el.textContent.trim();
            if (text) copyToClipboard(text);
        });
    });
});

// ===================================
// Simple Notification System
// ===================================
const showNotification = (message, duration = 2500) => {
    const notification = document.createElement('div');
    
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 40px;
        padding: 1.2rem 2.5rem;
        background: rgba(26, 26, 26, 0.95);
        color: #d4af37;
        border: 1px solid rgba(212, 175, 55, 0.3);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        font-weight: 600;
        font-size: 0.95rem;
        font-family: 'Montserrat', sans-serif;
        backdrop-filter: blur(10px);
        transform: translateX(500px);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    $.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(500px)';
        setTimeout(() => {
            if ($.body.contains(notification)) {
                $.body.removeChild(notification);
            }
        }, 300);
    }, duration);
};

// ===================================
// Countdown Timer
// ===================================
const eventDate = new Date('February 14, 2025 09:30:00').getTime();
let countdownInterval;

const updateCountdown = () => {
    if (!$.countdown) return;
    
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
        $.countdown.innerHTML = '<span style="color: #d4af37;">Event Started!</span>';
        if (countdownInterval) clearInterval(countdownInterval);
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    $.countdown.innerHTML = `
        <div class="countdown-item">
            <span class="countdown-value">${String(days).padStart(2, '0')}</span>
            <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${String(hours).padStart(2, '0')}</span>
            <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${String(minutes).padStart(2, '0')}</span>
            <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
            <span class="countdown-value">${String(seconds).padStart(2, '0')}</span>
            <span class="countdown-label">Seconds</span>
        </div>
    `;
};

if ($.countdown) {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// ===================================
// Lazy Load Images
// ===================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, { rootMargin: '100px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
});

// ===================================
// Keyboard Shortcuts
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC - Close menu
    if (e.key === 'Escape' && menuOpen) {
        $.hamburger?.classList.remove('active');
        $.navMenu?.classList.remove('active');
        $.body.style.overflow = 'visible';
        menuOpen = false;
    }
    
    // Ctrl/Cmd + Home - Scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===================================
// Performance Monitor
// ===================================
window.addEventListener('load', () => {
    if (window.performance?.timing) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log('%c⚡ HILARICAS 2025', 'color: #d4af37; font-size: 16px; font-weight: bold;');
        console.log(`%c✓ Page loaded in ${loadTime}ms`, 'color: #00ff00; font-size: 12px;');
    }
});

// ===================================
// Page Visibility - Pause animations when hidden
// ===================================
document.addEventListener('visibilitychange', () => {
    const animations = document.querySelectorAll('.floating-element, .star');
    
    animations.forEach(el => {
        el.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
    
    // Pause/Resume countdown
    if (document.hidden && countdownInterval) {
        clearInterval(countdownInterval);
    } else if (!document.hidden && $.countdown) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});

// ===================================
// Network Status
// ===================================
window.addEventListener('online', () => {
    showNotification('✅ Back online');
});

window.addEventListener('offline', () => {
    showNotification('⚠️ No internet');
});

// ===================================
// Reduced Motion Support
// ===================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animationDuration = '0.01ms';
        el.style.transitionDuration = '0.01ms';
    });
}

// ===================================
// Welcome Message
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎭 HILARICAS 2025 - Loaded Successfully!', 'color: #d4af37; font-size: 14px; font-weight: bold;');
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('🎉 Welcome to HILARICAS 2025!', 3000);
    }, 1500);
});

// ===================================
// Cleanup on page unload
// ===================================
window.addEventListener('beforeunload', () => {
    if (countdownInterval) clearInterval(countdownInterval);
    if (statsObserver) statsObserver.disconnect();
    if (revealObserver) revealObserver.disconnect();
    if (imageObserver) imageObserver.disconnect();
});

// ===================================
// Global Export
// ===================================
window.HILARICAS = {
    showNotification,
    version: '1.0.0'
};

// ===================================
// End of Simple Fast JS
// ===================================
console.log('%c🚀 All systems ready!', 'color: #00ff00; font-size: 13px; font-weight: bold;');

