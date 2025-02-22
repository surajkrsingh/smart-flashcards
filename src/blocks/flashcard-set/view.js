document.addEventListener('DOMContentLoaded', function() {
    const flashcardSets = document.querySelectorAll('.wp-block-smfcs-flashcard-set');
    
    flashcardSets.forEach(set => {
        // Get existing navigation if it exists
        const existingNav = set.querySelector('.flashcard-set-nav');
        if (existingNav) {
            initializeNavigation(set, existingNav);
            return;
        }

        let inner = set.querySelector('.flashcard-set-inner') || set.querySelector('.flashcard-set-track');
        if (!inner) {
            inner = document.createElement('div');
            inner.className = 'flashcard-set-inner';
            const flashcards = Array.from(set.querySelectorAll('.wp-block-smfcs-flashcard'));
            flashcards.forEach(card => inner.appendChild(card));
            set.insertBefore(inner, set.firstChild);
        }

        const flashcards = Array.from(inner.querySelectorAll('.wp-block-smfcs-flashcard'));
        if (!flashcards.length) return;

        // Initialize based on display mode
        const displayMode = set.getAttribute('data-display-mode') || 'slide';
        if (displayMode === 'slide') {
            initializeSlideMode(set, inner, flashcards);
        } else if (displayMode === 'stack') {
            initializeStackMode(set, inner, flashcards);
        }
    });
});

function initializeNavigation(set, nav) {
    const inner = set.querySelector('.flashcard-set-inner') || set.querySelector('.flashcard-set-track');
    const flashcards = Array.from(inner.querySelectorAll('.wp-block-smfcs-flashcard'));
    const prevButton = nav.querySelector('.flashcard-nav-button.prev');
    const nextButton = nav.querySelector('.flashcard-nav-button.next');
    const counter = nav.querySelector('.flashcard-set-counter');
    
    let currentIndex = 0;
    let isAnimating = false;

    function updateDisplay() {
        if (isAnimating) return;
        isAnimating = true;

        // Hide all cards first
        flashcards.forEach(card => {
            card.classList.remove('is-active');
            // Remove any inline styles
            card.removeAttribute('style');
        });

        // Show current card
        const activeCard = flashcards[currentIndex];
        activeCard.classList.add('is-active');

        // Update counter and buttons
        counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === flashcards.length - 1;

        // Update container height using a class
        inner.style.height = `${activeCard.offsetHeight}px`;

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }

    // Initialize first card
    updateDisplay();

    // Event listeners
    prevButton?.addEventListener('click', () => {
        if (currentIndex > 0 && !isAnimating) {
            currentIndex--;
            updateDisplay();
        }
    });

    nextButton?.addEventListener('click', () => {
        if (currentIndex < flashcards.length - 1 && !isAnimating) {
            currentIndex++;
            updateDisplay();
        }
    });

    // Handle window resize
    window.addEventListener('resize', debounce(() => updateDisplay(), 250));
}

function initializeSlideMode(set, inner, flashcards) {
    // Use existing navigation
    const nav = set.querySelector('.flashcard-set-nav');
    if (nav) {
        initializeNavigation(set, nav);
    }
}

function initializeStackMode(set, inner, flashcards) {
    // Set initial stacked positions
    const stackOffset = 5; // pixels to offset each card
    const maxOffset = 30; // maximum total offset

    flashcards.forEach((card, index) => {
        const offset = Math.min(index * stackOffset, maxOffset);
        card.style.transform = `translateY(${offset}px)`;
        card.style.zIndex = flashcards.length - index;
        card.style.position = 'absolute';
        card.style.top = '0';
        card.style.left = '0';
        card.style.width = '100%';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
    });

    // Set container height to accommodate stacked cards
    const maxHeight = flashcards[0]?.offsetHeight + maxOffset;
    inner.style.height = `${maxHeight}px`;
    inner.style.position = 'relative';

    // Handle click to move to bottom
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            if (card === inner.firstElementChild) {
                inner.appendChild(card);
                updateStackPositions(inner, stackOffset, maxOffset);
            }
        });
    });
}

function updateStackPositions(inner, stackOffset, maxOffset) {
    const cards = Array.from(inner.children);
    cards.forEach((card, index) => {
        const offset = Math.min(index * stackOffset, maxOffset);
        card.style.transform = `translateY(${offset}px)`;
        card.style.zIndex = cards.length - index;
    });
}

// Debounce helper function
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

function initializeFlashcards() {
    // Initialize flip functionality for all flashcards
    document.querySelectorAll('.flashcard-inner:not(.initialized)').forEach(card => {
        const frontSide = card.querySelector('.flashcard-front');
        const backSide = card.querySelector('.flashcard-back');

        function toggleFlip(e) {
            e.preventDefault();
            card.classList.toggle('is-flipped');
            const isFlipped = card.classList.contains('is-flipped');
            frontSide.setAttribute('aria-hidden', isFlipped);
            backSide.setAttribute('aria-hidden', !isFlipped);
        }

        card.addEventListener('click', toggleFlip);
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip(e);
            }
        });
        card.classList.add('initialized');
    });

    // Initialize flashcard sets
    document.querySelectorAll('.wp-block-smfcs-flashcard-set:not(.initialized)').forEach(initializeFlashcardSet);
}

function initializeFlashcardSet(set) {
    const track = set.querySelector('.flashcard-set-track');
    if (!track) return;

    const prevBtn = set.querySelector('.flashcard-nav-button.prev');
    const nextBtn = set.querySelector('.flashcard-nav-button.next');
    const counter = set.querySelector('.flashcard-set-counter');
    const shuffleBtn = set.querySelector('.flashcard-shuffle-button');
    
    let slides = Array.from(track.querySelectorAll('.wp-block-smfcs-flashcard'));
    if (!slides.length) return;

    let currentSlide = 0;
    let isAnimating = false;
    
    const enableShuffle = set.dataset.enableShuffle === 'true';

    function updateCounter() {
        if (counter) {
            counter.textContent = `${currentSlide + 1} / ${slides.length}`;
        }
    }

    function updateSlides() {
        if (isAnimating) return;
        isAnimating = true;

        const prevSlide = slides[currentSlide - 1];
        const nextSlide = slides[currentSlide + 1];

        // Remove all state classes first
        slides.forEach(slide => {
            slide.classList.remove('is-active', 'prev', 'next');
        });

        // Set states for relevant slides
        if (prevSlide) {
            prevSlide.classList.add('prev');
        }
        if (nextSlide) {
            nextSlide.classList.add('next');
        }

        // Show current slide
        const activeSlide = slides[currentSlide];
        activeSlide.classList.add('is-active');

        // Update navigation
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
        updateCounter();

        // Update track height
        track.style.height = `${activeSlide.offsetHeight}px`;

        // Reset animation flag after transition completes
        setTimeout(() => {
            isAnimating = false;
            
            // Clean up slides not in view
            slides.forEach((slide, index) => {
                if (index !== currentSlide && 
                    index !== currentSlide - 1 && 
                    index !== currentSlide + 1) {
                    slide.classList.remove('prev', 'next');
                }
            });
        }, 400); // Match this with CSS transition duration
    }

    function handleShuffle() {
        if (isAnimating) return;
        slides = shuffleArray([...slides]);
        currentSlide = 0;
        slides.forEach(slide => track.appendChild(slide));
        updateSlides();
    }

    function handleNavigation(e, direction) {
        e.preventDefault();
        if (isAnimating) return;

        // Add direction class to container for animation
        track.classList.remove('sliding-left', 'sliding-right');
        track.classList.add(direction === 'prev' ? 'sliding-right' : 'sliding-left');

        if (direction === 'prev' && currentSlide > 0) {
            currentSlide--;
            updateSlides();
        } else if (direction === 'next' && currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }

        // Remove direction class after animation
        setTimeout(() => {
            track.classList.remove('sliding-left', 'sliding-right');
        }, 400);
    }

    // Event listeners
    prevBtn?.addEventListener('click', e => handleNavigation(e, 'prev'));
    nextBtn?.addEventListener('click', e => handleNavigation(e, 'next'));
    
    if (enableShuffle && shuffleBtn) {
        shuffleBtn.addEventListener('click', handleShuffle);
        shuffleBtn.style.display = 'block';
    }

    // Keyboard navigation
    set.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') handleNavigation(e, 'prev');
        if (e.key === 'ArrowRight') handleNavigation(e, 'next');
    });

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (slides[currentSlide]) {
            track.style.height = `${slides[currentSlide].offsetHeight}px`;
        }
    }, 250));

    // Initialize
    updateSlides();
    set.classList.add('initialized');
}

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFlashcards);
} else {
    initializeFlashcards();
}
