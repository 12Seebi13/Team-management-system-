// Dark mode toggle functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        html.classList.add('dark');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            html.classList.toggle('dark');
            localStorage.setItem('darkMode', html.classList.contains('dark') ? 'enabled' : 'disabled');
        });
    }

    // Keyboard shortcut (Press 'D' to toggle dark mode)
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
            if (darkModeToggle) {
                darkModeToggle.checked = !darkModeToggle.checked;
                darkModeToggle.dispatchEvent(new Event('change'));
            } else {
                html.classList.toggle('dark');
                localStorage.setItem('darkMode', html.classList.contains('dark') ? 'enabled' : 'disabled');
            }
        }
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-mobile-menu-items]');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Promotional banner
function showPromoBanner() {
    const banner = document.createElement('div');
    banner.className = 'fixed top-0 left-0 right-0 bg-indigo-600 text-white py-3 px-4 text-center transform transition-transform duration-300 z-50';
    banner.innerHTML = `
        <div class="max-w-7xl mx-auto relative">
            <p class="text-sm font-medium">🔥 Special Offer: Get 7 Days FREE Pro Trial + 50% Off Your First Month!</p>
            <button class="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-indigo-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    document.body.prepend(banner);
    // Slide in animation
    requestAnimationFrame(() => {
        banner.style.transform = 'translateY(-100%)';
        requestAnimationFrame(() => {
            banner.style.transform = 'translateY(0)';
        });
    });
}

// Newsletter subscription popup
function showNewsletterPopup() {
    setTimeout(() => {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        popup.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div class="text-center">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscribe to Our Newsletter</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-6">Get the latest updates and exclusive offers!</p>
                    <form class="space-y-4" id="newsletterForm">
                        <input type="email" placeholder="Enter your email" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                        <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Subscribe</button>
                    </form>
                    <button onclick="this.closest('.fixed').remove()" class="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">No thanks, maybe later</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        const form = popup.querySelector('#newsletterForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            showSuccessMessage(form, 'Thanks for subscribing!');
            setTimeout(() => popup.remove(), 2000);
        });
    }, 5000); // Show after 5 seconds
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate email
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && !emailRegex.test(emailInput.value)) {
                showInputError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            // Validate password
            const passwordInput = form.querySelector('input[type="password"]');
            if (passwordInput && passwordInput.value.length < 8) {
                showInputError(passwordInput, 'Password must be at least 8 characters long');
                isValid = false;
            }

            // Validate confirm password
            const confirmPassword = form.querySelector('#confirm-password');
            if (confirmPassword && confirmPassword.value !== passwordInput.value) {
                showInputError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }

            if (isValid) {
                showSuccessMessage(form);
            }
        });
    });
}

function showInputError(input, message) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    }
    input.classList.add('border-red-500');
}

function showSuccessMessage(form, message = 'Form submitted successfully!') {
    const successMessage = document.createElement('div');
    successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
    successMessage.textContent = message;
    form.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
}

// Back to top button
function initializeBackToTop() {
    const button = document.createElement('button');
    button.className = 'fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600';
    button.innerHTML = `
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
    `;
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.style.opacity = window.scrollY > 300 ? '1' : '0';
        button.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// User greeting
function showUserGreeting() {
    const greetingContainer = document.querySelector('[data-greeting]');
    if (greetingContainer) {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
        greetingContainer.textContent = `${greeting}, Guest!`;
    }
}

// Appointment reminder
function showAppointmentReminder() {
    if (window.location.pathname.includes('appointments')) {
        setTimeout(() => {
            const reminder = document.createElement('div');
            reminder.className = 'fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm border border-indigo-100 dark:border-indigo-800';
            reminder.innerHTML = `
                <div class="flex items-start">
                    <div class="flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">Upcoming Meeting</h3>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Team Meeting in 30 minutes</p>
                        <div class="mt-2">
                            <button class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500" onclick="this.closest('div.fixed').remove()">Dismiss</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(reminder);
        }, 3000);
    }
}

// Page load animation
function initializePageLoadAnimation() {
    const sections = document.querySelectorAll('section, .animate-on-load');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('load', () => {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeMobileMenu();
    initializeFormValidation();
    initializeBackToTop();
    initializePageLoadAnimation();
    showUserGreeting();
    showAppointmentReminder();
    
    // Show promo banner and newsletter popup
    setTimeout(showPromoBanner, 1000);
    showNewsletterPopup();
});