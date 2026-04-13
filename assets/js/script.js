// Navigation and Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const topicCards = document.querySelectorAll('.topic-card');

    if (searchInput && searchBtn) {
        // Search on input
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });

        // Search on button click
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    function performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        topicCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
                // Highlight matching text
                if (searchTerm.length > 0) {
                    card.classList.add('search-match');
                } else {
                    card.classList.remove('search-match');
                }
            } else {
                card.style.display = 'none';
                card.classList.remove('search-match');
            }
        });

        // Show "no results" message if needed
        const visibleCards = Array.from(topicCards).filter(card => card.style.display !== 'none');
        const noResultsMsg = document.getElementById('noResults');
        
        if (visibleCards.length === 0 && searchTerm.length > 0) {
            if (!noResultsMsg) {
                const noResults = document.createElement('div');
                noResults.id = 'noResults';
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No results found for "${query}"</h3>
                    <p>Try searching with different keywords</p>
                `;
                document.querySelector('.topics-grid').appendChild(noResults);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Topic card navigation
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.dataset.topic;
            if (topic) {
                navigateToTopic(topic);
            }
        });
    });

    function navigateToTopic(topic) {
        // Create the topic page URL and navigate directly
        const topicUrl = `pages/${topic}.html`;
        window.location.href = topicUrl;
    }

    function showLoadingAnimation() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>Loading topic...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);

        // Add loading styles
        const style = document.createElement('style');
        style.textContent = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            .loading-content {
                text-align: center;
            }
            .loading-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search
        if (e.key === '/' && searchInput && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Press 'Escape' to clear search
        if (e.key === 'Escape' && searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            performSearch('');
            searchInput.blur();
        }
    });

    // Add analytics tracking (placeholder)
    function trackEvent(eventName, properties = {}) {
        // This would integrate with Google Analytics or similar
        console.log('Track Event:', eventName, properties);
    }

    // Track topic clicks
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.dataset.topic;
            const titleEl = this.querySelector('h3') || this.querySelector('h4');
            const title = titleEl ? titleEl.textContent : topic;
            const difficultyEl = this.querySelector('.difficulty');
            trackEvent('topic_clicked', {
                topic: topic,
                title: title,
                difficulty: difficultyEl ? difficultyEl.textContent : 'N/A'
            });
        });
    });

    // Track search queries
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value.trim().length > 0) {
                    trackEvent('search_performed', {
                        query: this.value.trim(),
                        results: document.querySelectorAll('.topic-card[style*="flex"]').length
                    });
                }
            }, 500);
        });
    }

    // Add bookmark functionality
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    bookmarkButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const topic = this.closest('.topic-card').dataset.topic;
            toggleBookmark(topic, this);
        });
    });

    function toggleBookmark(topic, button) {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const index = bookmarks.indexOf(topic);
        
        if (index > -1) {
            bookmarks.splice(index, 1);
            button.classList.remove('bookmarked');
            showNotification('Bookmark removed');
        } else {
            bookmarks.push(topic);
            button.classList.add('bookmarked');
            showNotification('Bookmark added');
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #333;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 5px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    function showTooltip(element) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.dataset.tooltip;
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Add print functionality
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Initialize theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcon();
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const icon = document.querySelector('.theme-toggle i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential use in other scripts
window.PortalUtils = {
    debounce,
    throttle
};
