// Concept Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress tracking
    initializeProgressTracking();
    
    // Initialize quiz functionality
    initializeQuiz();
    
    // Initialize collapsible sections
    initializeCollapsibleSections();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize bookmark functionality
    initializeBookmarks();
    
    // Initialize scroll-to-top button
    initializeScrollToTop();
    
    // Initialize interview questions accordion
    initializeInterviewAccordion();
    
    // Initialize navigation highlighting
    initializeNavigationHighlighting();
});

// Progress Tracking
function initializeProgressTracking() {
    const sections = document.querySelectorAll('.content-section');
    const progressSteps = document.querySelectorAll('.step');
    const progressBar = document.querySelector('.progress-fill');
    
    // Update progress based on scroll position
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        let completedSections = 0;
        let totalSections = sections.length;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            const sectionBottom = sectionTop + rect.height;
            
            if (scrollTop + windowHeight * 0.5 >= sectionTop) {
                completedSections = index + 1;
                progressSteps[index].classList.add('completed');
                
                if (index < totalSections - 1) {
                    progressSteps[index + 1].classList.add('active');
                }
            }
        });
        
        const progressPercentage = (completedSections / totalSections) * 100;
        if (progressBar) {
            progressBar.style.width = progressPercentage + '%';
        }
    }
    
    // Scroll event listener
    window.addEventListener('scroll', throttle(updateProgress, 100));
    
    // Step click navigation
    progressSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            const targetSection = sections[index];
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initial progress update
    updateProgress();
}

// Quiz Functionality
function initializeQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    const submitBtn = document.getElementById('submitQuiz');
    const resetBtn = document.getElementById('resetQuiz');
    const scoreElement = document.getElementById('quizScore');
    const currentQuestionElement = document.getElementById('currentQuestion');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    
    let currentQuestion = 1;
    let score = 0;
    let answers = {};
    
    // Handle option selection
    const optionLabels = document.querySelectorAll('.option-label');
    optionLabels.forEach(label => {
        label.addEventListener('click', function() {
            const questionName = this.querySelector('input').name;
            const questionValue = this.querySelector('input').value;
            
            // Clear previous selection for this question
            document.querySelectorAll(`input[name="${questionName}"]`).forEach(radio => {
                radio.closest('.option-label').classList.remove('selected');
            });
            
            // Mark as selected
            this.classList.add('selected');
            answers[questionName] = questionValue;
            
            // Auto-advance to next question after selection
            setTimeout(() => {
                const nextQuestion = currentQuestion + 1;
                if (nextQuestion <= parseInt(totalQuestionsElement.textContent)) {
                    goToQuestion(nextQuestion);
                }
            }, 300);
        });
    });
    
    // Submit quiz
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            submitQuiz();
        });
    }
    
    // Reset quiz
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetQuiz();
        });
    }
    
    function submitQuiz() {
        const questions = document.querySelectorAll('.question-card');
        let correctAnswers = 0;
        
        questions.forEach((question, index) => {
            const correctOption = question.dataset.correct;
            const selectedOption = answers[`question_${index + 1}`];
            
            const options = question.querySelectorAll('.option-label');
            options.forEach(option => {
                const value = option.querySelector('input').value;
                option.classList.remove('correct', 'incorrect');
                
                if (value === correctOption) {
                    option.classList.add('correct');
                } else if (value === selectedOption && value !== correctOption) {
                    option.classList.add('incorrect');
                }
            });
            
            if (selectedOption === correctOption) {
                correctAnswers++;
            }
        });
        
        score = correctAnswers;
        if (scoreElement) {
            scoreElement.textContent = score;
        }
        
        // Show results
        showQuizResults(correctAnswers, questions.length);
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Quiz Submitted';
    }
    
    function resetQuiz() {
        // Clear all selections
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
            radio.closest('.option-label').classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Reset variables
        answers = {};
        score = 0;
        currentQuestion = 1;
        
        if (scoreElement) {
            scoreElement.textContent = '0';
        }
        
        if (currentQuestionElement) {
            currentQuestionElement.textContent = '1';
        }
        
        // Reset submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Quiz';
        
        // Hide results
        if (window.hideQuizResults) window.hideQuizResults();
        
        // Scroll to first question
        const firstQuestion = document.querySelector('.question-card');
        if (firstQuestion) {
            firstQuestion.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    function goToQuestion(questionNumber) {
        const questions = document.querySelectorAll('.question-card');
        if (questionNumber >= 1 && questionNumber <= questions.length) {
            currentQuestion = questionNumber;
            if (currentQuestionElement) {
                currentQuestionElement.textContent = currentQuestion;
            }
            
            questions[questionNumber - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    function showQuizResults(correct, total) {
        const percentage = Math.round((correct / total) * 100);
        let message = '';
        let emoji = '';
        
        if (percentage >= 80) {
            message = 'Excellent work! You have a strong understanding of this topic.';
            emoji = '🎉';
        } else if (percentage >= 60) {
            message = 'Good job! You have a decent understanding but could review some concepts.';
            emoji = '👍';
        } else if (percentage >= 40) {
            message = 'Not bad! Consider reviewing the material to improve your understanding.';
            emoji = '📚';
        } else {
            message = 'Keep learning! Review the concepts and try the quiz again.';
            emoji = '💪';
        }
        
        const resultsHtml = `
            <div class="quiz-results" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                border-radius: 10px;
                text-align: center;
                margin-top: 2rem;
            ">
                <div class="results-emoji" style="font-size: 3rem; margin-bottom: 1rem;">${emoji}</div>
                <h3 style="margin-bottom: 1rem;">Quiz Complete!</h3>
                <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Your Score: ${correct}/${total} (${percentage}%)</p>
                <p style="margin-bottom: 1.5rem;">${message}</p>
                <button onclick="hideQuizResults()" style="
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                ">Close Results</button>
            </div>
        `;
        
        const existingResults = document.querySelector('.quiz-results');
        if (existingResults) {
            existingResults.remove();
        }
        
        quizContainer.insertAdjacentHTML('beforeend', resultsHtml);
    }
    
    // Expose hideQuizResults globally for inline onclick handler
    window.hideQuizResults = function() {
        const results = document.querySelector('.quiz-results');
        if (results) {
            results.remove();
        }
    };
}

// Collapsible Sections
function initializeCollapsibleSections() {
    const toggleButtons = document.querySelectorAll('.btn-icon[onclick*="toggleSection"]');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('onclick').match(/toggleSection\('([^']+)'\)/)[1];
            toggleSection(sectionId);
        });
    });
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const content = section.querySelector('.section-content');
    const icon = section.querySelector('.btn-icon i');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        content.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
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
    if (icon) {
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// Bookmark Functionality
function initializeBookmarks() {
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    if (!bookmarkBtn) return;
    
    const topicId = bookmarkBtn.dataset.topic;
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    
    // Update button state based on existing bookmark
    if (bookmarks.includes(topicId)) {
        bookmarkBtn.classList.add('bookmarked');
        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
    }
    
    bookmarkBtn.addEventListener('click', function() {
        toggleBookmark(topicId, this);
    });
}

function toggleBookmark(topicId, button) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const index = bookmarks.indexOf(topicId);
    
    if (index > -1) {
        bookmarks.splice(index, 1);
        button.classList.remove('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Bookmark';
        showNotification('Bookmark removed');
    } else {
        bookmarks.push(topicId);
        button.classList.add('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
        showNotification('Bookmark added');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Scroll to Top
function initializeScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    }, 100));
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Interview Questions Accordion
function initializeInterviewAccordion() {
    const questionHeaders = document.querySelectorAll('.question-header');
    
    questionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const questionCard = this.closest('.question-card');
            const isExpanded = questionCard.classList.contains('expanded');
            
            // Close all other questions
            document.querySelectorAll('.question-card').forEach(card => {
                card.classList.remove('expanded');
            });
            
            // Toggle current question
            if (!isExpanded) {
                questionCard.classList.add('expanded');
            }
        });
    });
}

// Navigation Highlighting
function initializeNavigationHighlighting() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', throttle(function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Utility Functions
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

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
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
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Skip shortcuts when typing in input/textarea fields
    const activeTag = document.activeElement.tagName.toLowerCase();
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        // Only allow Escape key when typing
        if (e.key !== 'Escape') return;
    }
    
    // Press 'Escape' to close expanded sections
    if (e.key === 'Escape') {
        document.querySelectorAll('.question-card.expanded').forEach(card => {
            card.classList.remove('expanded');
        });
    }
    
    // Press 'B' to toggle bookmark
    if (e.key === 'b' && !e.ctrlKey && !e.metaKey) {
        const bookmarkBtn = document.querySelector('.bookmark-btn');
        if (bookmarkBtn && document.activeElement !== bookmarkBtn) {
            bookmarkBtn.click();
        }
    }
    
    // Press 'T' to toggle theme
    if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// Print functionality
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // This would integrate with Google Analytics or similar
    console.log('Track Event:', eventName, properties);
}

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            trackEvent('section_viewed', {
                section: sectionId,
                topic: window.location.pathname
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.content-section').forEach(section => {
    sectionObserver.observe(section);
});

// Export functions for global access
window.ConceptPage = {
    toggleSection,
    toggleBookmark,
    showNotification,
    trackEvent
};
