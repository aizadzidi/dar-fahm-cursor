// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const isActive = mobileMenu.classList.contains('active');
            
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Update icon
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-bars' : 'fas fa-times';
            }
            
            // Add stagger animation to menu items
            if (!isActive) {
                const menuItems = navLinks.querySelectorAll('li');
                menuItems.forEach((item, index) => {
                    item.style.setProperty('--item-index', index);
                });
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu && navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset icon
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && navLinks.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset icon
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset icon
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.program-card, .teacher-card, .contact-item, .founder-content, .testimonial-card, .achievement, .feature, .timeline-content, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        observer.observe(el);
    });

    // Counter animation for statistics (if we had any)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Add floating animation to hero elements (if they exist)
    const floatingElements = document.querySelectorAll('.element');
    
    if (floatingElements.length > 0) {
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add parallax effect to hero section (desktop only and when motion is allowed)
    let lastScrollY = window.pageYOffset;
    const allowMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const enableParallax = allowMotion && window.innerWidth >= 992;

    if (enableParallax) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            const speed = 0.3;
            if (parallax) parallax.style.transform = `translateY(${scrolled * speed}px)`;

            // Hide/show header on scroll
            if (header) {
                if (scrolled > lastScrollY && scrolled > 100) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
                lastScrollY = scrolled;
            }
        });
    } else {
        // Maintain header hide/show without parallax to keep layout stable on mobile
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (header) {
                if (scrolled > lastScrollY && scrolled > 100) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
                lastScrollY = scrolled;
            }
        });
    }

    // Add hover effects to program cards
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add stagger animation to navigation items
    const navItems = document.querySelectorAll('.nav-links li');
    
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add typing effect to hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrolled}%;
                height: 3px;
                background: #2c5530;
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = scrolled + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Add form validation for contact form (if added later)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Remove error class after user starts typing
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                });
            }
        });
        
        return isValid;
    }

    // Add search functionality (if search is added later)
    function addSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchableElements = document.querySelectorAll('[data-searchable]');
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                searchableElements.forEach(element => {
                    const text = element.textContent.toLowerCase();
                    const isVisible = text.includes(searchTerm);
                    
                    element.style.display = isVisible ? 'block' : 'none';
                });
            });
        }
    }

    // Add error handling for images
    function addImageErrorHandling() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // If image fails to load, show placeholder
                if (this.classList.contains('teacher-photo')) {
                    this.style.display = 'none';
                    const parent = this.parentElement;
                    parent.style.backgroundImage = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='24' r='14' fill='%23ffffff'/><path d='M8 58c0-12.15 10.85-22 24-22s24 9.85 24 22' fill='%23ffffff'/></svg>\")";
                    parent.innerHTML = '<i class="fas fa-user-graduate" style="font-size: 4rem; color: var(--light-text);"></i>';
                } else {
                    // For other images, hide and show fallback
                    this.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = this.style.cssText;
                    fallback.style.background = 'var(--primary-color)';
                    fallback.style.display = 'flex';
                    fallback.style.alignItems = 'center';
                    fallback.style.justifyContent = 'center';
                    fallback.innerHTML = '<i class="fas fa-user-graduate" style="font-size: 4rem; color: white;"></i>';
                    this.parentNode.appendChild(fallback);
                }
            });
            
            img.addEventListener('load', function() {
                // Image loaded successfully
                this.style.opacity = '1';
            });
        });
    }

    // Handle contact form submit: send via email service
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const isValid = validateForm(contactForm);
            if (!isValid) return;

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Menghantar...';

            try {
                const formData = new FormData(contactForm);
                // Extra metadata for email service
                formData.append('_subject', 'Pertanyaan baharu daripada laman web Darul Fahmi');
                formData.append('_template', 'table');
                formData.append('_captcha', 'false');

                // Send using FormSubmit AJAX endpoint
                const response = await fetch('https://formsubmit.co/ajax/darulfahmiofficial@gmail.com', {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                    body: formData
                });

                if (!response.ok) throw new Error('Ralat rangkaian');
                const result = await response.json();
                if (result.success !== 'true') throw new Error('Penghantaran gagal');

                submitButton.textContent = 'Terima kasih! Mesej dihantar';
                contactForm.reset();
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2500);
            } catch (err) {
                submitButton.textContent = 'Ralat. Sila cuba lagi';
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2500);
            }
        });
    }

    // Add lazy loading for images (if images are added later)
    function addLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize all enhancements
    addImageErrorHandling();
    addLazyLoading();
    addSearchFunctionality();
    initModernSlider();
    initFAQAccordion();
    initTestimonialsCarousel();
    
    // Add accessibility improvements
    function improveAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#utama';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #2c5530;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add keyboard navigation for custom elements
        const customButtons = document.querySelectorAll('.btn, .program-card');
        
        customButtons.forEach(button => {
            button.setAttribute('tabindex', '0');
            
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    improveAccessibility();
    
    console.log('Darul Fahmi website loaded successfully!');
});

// Modern Slider with Advanced Features
function initModernSlider() {
    const slider = document.querySelector('.modern-slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const indicators = document.querySelectorAll('.indicator');
    const progressBar = document.querySelector('.progress-bar');
    
    if (!slides.length) return;

    let currentSlide = 0;
    let isAnimating = false;
    let autoPlayInterval = null;
    const autoPlayDelay = 5000; // 5 seconds

    // Update slide and indicators
    function updateSlider(newSlide) {
        if (isAnimating || newSlide === currentSlide) return;
        
        isAnimating = true;
        
        // Move slides wrapper
        const slidesWrapper = document.querySelector('.slides-wrapper');
        if (slidesWrapper) {
            slidesWrapper.style.transform = `translateX(-${newSlide * 100}%)`;
        }
        
        // Update slides
        slides[currentSlide]?.classList.remove('active');
        slides[newSlide]?.classList.add('active');
        
        // Update indicators
        indicators[currentSlide]?.classList.remove('active');
        indicators[newSlide]?.classList.add('active');
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${((newSlide + 1) / slides.length) * 100}%`;
        }
        
        currentSlide = newSlide;
        
        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        updateSlider(next);
    }

    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider(prev);
    }

    // Go to specific slide
    function goToSlide(index) {
        updateSlider(index);
    }

    // Auto-play functionality
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event listeners
    prevBtn?.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        setTimeout(startAutoPlay, 10000); // Restart after 10s
    });

    nextBtn?.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        setTimeout(startAutoPlay, 10000); // Restart after 10s
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            setTimeout(startAutoPlay, 10000); // Restart after 10s
        });
    });

    // Touch/Swipe support
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    const minSwipeDistance = 50;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        stopAutoPlay();
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Prevent vertical scrolling if horizontal swipe is detected
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }, { passive: false });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
        
        isDragging = false;
        setTimeout(startAutoPlay, 3000); // Restart auto-play after 3s
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!slider.matches(':hover')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
                break;
        }
    });

    // Pause auto-play on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Pause auto-play when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    // Initialize slider position and progress bar
    const slidesWrapper = document.querySelector('.slides-wrapper');
    if (slidesWrapper) {
        slidesWrapper.style.transform = `translateX(0%)`;
    }
    
    if (progressBar) {
        progressBar.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
    }
    
    // Initialize first slide as active
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (indicators[0]) {
            indicators[0].classList.add('active');
        }
    }
    
    // Start auto-play after a short delay
    setTimeout(startAutoPlay, 2000);
    
    console.log(`Modern slider initialized with ${slides.length} slides`);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 5px rgba(231, 76, 60, 0.3) !important;
    }
    
    .loaded {
        opacity: 1;
    }
    
    .nav-item {
        animation: slideInDown 0.6s ease forwards;
        opacity: 0;
        transform: translateY(-20px);
    }
    
    @keyframes slideInDown {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    img.lazy {
        filter: blur(5px);
        transition: filter 0.3s ease;
    }
    
    img.lazy.loaded {
        filter: blur(0);
    }
`;

document.head.appendChild(style);

// FAQ accordion logic
function initFAQAccordion() {
    const items = document.querySelectorAll('.faq-item');
    const questions = document.querySelectorAll('.faq-question');
    if (questions.length === 0) return;

    const closeItem = (item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;
        // If the item is not open, ensure it's in a closed state and do nothing else
        if (!item.classList.contains('open')) {
            question.setAttribute('aria-expanded', 'false');
            answer.getAnimations().forEach(a => a.cancel());
            answer.style.height = '0px';
            answer.style.opacity = '0';
            answer.style.transform = 'translateY(8px)';
            answer.style.paddingTop = '0px';
            answer.style.paddingBottom = '0px';
            const icon = question.querySelector('.faq-icon');
            if (icon) icon.textContent = '+';
            return;
        }

        question.setAttribute('aria-expanded', 'false');
        item.classList.remove('open');
        // Cancel any in-flight animations
        answer.getAnimations().forEach(a => a.cancel());
        // From current natural height to 0 with fade/translate and padding collapse
        const currentHeight = answer.scrollHeight;
        answer.style.height = currentHeight + 'px';
        answer.style.paddingTop = '12px';
        answer.style.paddingBottom = '18px';
        const anim = answer.animate([
            { height: currentHeight + 'px', opacity: 1, transform: 'translateY(0)', paddingTop: '12px', paddingBottom: '18px' },
            { height: '0px', opacity: 0, transform: 'translateY(8px)', paddingTop: '0px', paddingBottom: '0px' }
        ], { duration: 400, easing: 'ease-out' });
        anim.addEventListener('finish', () => {
            answer.style.height = '0px';
            answer.style.opacity = '0';
            answer.style.transform = 'translateY(8px)';
            answer.style.paddingTop = '0px';
            answer.style.paddingBottom = '0px';
        });
        const icon = question.querySelector('.faq-icon');
        if (icon) icon.textContent = '+';
    };

    const openItem = (item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;
        question.setAttribute('aria-expanded', 'true');
        item.classList.add('open');
        // Cancel any in-flight animations
        answer.getAnimations().forEach(a => a.cancel());
        // Measure end height with target paddings applied
        answer.style.height = 'auto';
        answer.style.paddingTop = '12px';
        answer.style.paddingBottom = '18px';
        const endHeight = answer.scrollHeight;
        // Set starting collapsed state
        answer.style.height = '0px';
        answer.style.opacity = '0';
        answer.style.transform = 'translateY(8px)';
        answer.style.paddingTop = '0px';
        answer.style.paddingBottom = '0px';
        // Animate to expanded state
        const anim = answer.animate([
            { height: '0px', opacity: 0, transform: 'translateY(8px)', paddingTop: '0px', paddingBottom: '0px' },
            { height: endHeight + 'px', opacity: 1, transform: 'translateY(0)', paddingTop: '12px', paddingBottom: '18px' }
        ], { duration: 400, easing: 'ease-out' });
        anim.addEventListener('finish', () => {
            answer.style.height = 'auto';
            answer.style.opacity = '1';
            answer.style.transform = 'none';
            answer.style.paddingTop = '12px';
            answer.style.paddingBottom = '18px';
        });
        const icon = question.querySelector('.faq-icon');
        if (icon) icon.textContent = '−';
    };

    questions.forEach((btn) => {
        btn.addEventListener('click', () => {
            const currentItem = btn.closest('.faq-item');
            const isOpen = currentItem && currentItem.classList.contains('open');

            // Determine previously open item (if any) and close it with animation
            const previouslyOpen = document.querySelector('.faq-item.open');
            if (previouslyOpen && previouslyOpen !== currentItem) {
                closeItem(previouslyOpen);
            }

            // Instantly ensure all other items (not current or previously open) are fully closed (no flicker)
            items.forEach((it) => {
                if (it !== currentItem && it !== previouslyOpen) {
                    const q = it.querySelector('.faq-question');
                    const a = it.querySelector('.faq-answer');
                    if (!q || !a) return;
                    it.classList.remove('open');
                    q.setAttribute('aria-expanded', 'false');
                    a.getAnimations().forEach(anim => anim.cancel());
                    a.style.height = '0px';
                    a.style.opacity = '0';
                    a.style.transform = 'translateY(8px)';
                    a.style.paddingTop = '0px';
                    a.style.paddingBottom = '0px';
                    const ic = q.querySelector('.faq-icon');
                    if (ic) ic.textContent = '+';
                }
            });

            // If the clicked one was not open, open it (animate)
            if (currentItem && !isOpen) {
                openItem(currentItem);
            }
        });
    });

    // Handle resize: keep open item heights correct
    window.addEventListener('resize', () => {
        items.forEach((item) => {
            if (item.classList.contains('open')) {
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Testimonials (Kalam Asatizah) Carousel
function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prev = document.querySelector('.testimonial-prev');
    const next = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    if (!carousel || !track || slides.length === 0) return;

    let current = 0;
    let autoTimer = null;

    const getWidth = () => carousel.clientWidth;

    function size() {
        const w = getWidth();
        slides.forEach(s => {
            s.style.width = w + 'px';
            s.style.flex = '0 0 ' + w + 'px';
        });
        track.style.width = (w * slides.length) + 'px';
    }

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(${-current * getWidth()}px)`;
        dots.forEach(d => d.classList.remove('active'));
        if (dots[current]) dots[current].classList.add('active');
        slides.forEach((slide, i) => slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`));
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(() => goTo(current + 1), 6000);
    }

    function stopAuto() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = null;
    }

    prev && prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    next && next.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    dots.forEach(dot => dot.addEventListener('click', () => {
        const i = parseInt(dot.getAttribute('data-index')) || 0;
        goTo(i);
        startAuto();
    }));

    // Touch swipe
    let startX = 0;
    let isDown = false;
    track.addEventListener('touchstart', e => { isDown = true; startX = e.touches[0].clientX; stopAuto(); });
    track.addEventListener('touchmove', e => {
        if (!isDown) return;
        const diff = e.touches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
            isDown = false;
            if (diff > 0) goTo(current - 1); else goTo(current + 1);
            startAuto();
        }
    });
    track.addEventListener('touchend', () => { isDown = false; startAuto(); });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    window.addEventListener('resize', () => { size(); goTo(current); });
    size();
    goTo(0);
    startAuto();
}

// Smart sticky CTA visibility based on sections with existing CTAs
function initStickyCTAVisibility() {
    const stickyCTA = document.querySelector('.sticky-cta');
    if (!stickyCTA) return;

    function checkStickyCTAVisibility() {
        const viewportHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        const viewportTop = scrollTop;
        const viewportBottom = scrollTop + viewportHeight;
        
        let shouldHide = false;

        // Check for any visible CTA buttons in the viewport (excluding the sticky CTA)
        const ctaButtons = document.querySelectorAll('.btn[href*="forms.gle"], .registration-btn[href*="forms.gle"]');
        for (const button of ctaButtons) {
            if (button === stickyCTA) continue;
            const rect = button.getBoundingClientRect();
            const buttonTop = rect.top + scrollTop;
            const buttonBottom = buttonTop + rect.height;
            if (viewportBottom > buttonTop && viewportTop < buttonBottom) {
                shouldHide = true;
                break;
            }
        }

        // Toggle visibility with smooth transition
        if (shouldHide) {
            stickyCTA.classList.add('hidden');
        } else {
            stickyCTA.classList.remove('hidden');
        }
    }

    // Check on scroll with throttling for performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkStickyCTAVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', checkStickyCTAVisibility);
    
    // Initial check
    checkStickyCTAVisibility();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initStickyCTAVisibility);
