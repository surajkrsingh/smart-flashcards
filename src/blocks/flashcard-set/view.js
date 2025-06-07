document.addEventListener('DOMContentLoaded', function () {
    initializeFlashcardSets();
});

// Handle flashcard set functionality with display modes
function initializeFlashcardSets() {
    const flashcardSets = document.querySelectorAll('.wp-block-smfcs-flashcard-set');

    flashcardSets.forEach((set, index) => {
        const track = set.querySelector('.flashcard-set-track');
        if (!track) {
            return;
        }

        const flashcards = Array.from(track.querySelectorAll('.wp-block-smfcs-flashcard'));
        if (!flashcards.length) {
            return;
        }

        // Get display mode and shuffle setting
        const displayMode = set.getAttribute('data-display-mode') || 'slide';
        const enableShuffle = set.getAttribute('data-enable-shuffle') === 'true';
        
        // Check if shuffle button exists
        const shuffleBtn = set.querySelector('.flashcard-shuffle-button');
        
        // Initialize based on display mode
        switch (displayMode) {
            case 'slide':
                initializeSlideMode(set, track, flashcards);
                break;
            case 'stack':
                initializeStackMode(set, track, flashcards);
                break;
            case 'grid':
                initializeGridMode(set, track, flashcards);
                break;
            default:
                initializeSlideMode(set, track, flashcards);
        }

        // Mark as initialized
        set.classList.add('initialized');
    });
}

// SLIDE MODE: Classic carousel with previous/next navigation
function initializeSlideMode(set, track, flashcards) {
    let currentSlide = 0;
    let isAnimating = false;

    const nav = set.querySelector('.flashcard-set-nav');
    const prevBtn = nav?.querySelector('.flashcard-nav-button.prev');
    const nextBtn = nav?.querySelector('.flashcard-nav-button.next');
    const counter = nav?.querySelector('.flashcard-set-counter');
    const shuffleBtn = nav?.querySelector('.flashcard-shuffle-button');

    const enableShuffle = set.getAttribute('data-enable-shuffle') === 'true';

    function updateSlides() {
        if (isAnimating) return;
        isAnimating = true;

        // Remove all state classes first
        flashcards.forEach(slide => {
            slide.classList.remove('is-active', 'prev', 'next');
        });

        // Set states for relevant slides
        const prevSlide = flashcards[currentSlide - 1];
        const nextSlide = flashcards[currentSlide + 1];
        const activeSlide = flashcards[currentSlide];

        if (prevSlide) prevSlide.classList.add('prev');
        if (nextSlide) nextSlide.classList.add('next');
        activeSlide.classList.add('is-active');

        // Update navigation
        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === flashcards.length - 1;
        
        // Update counter
        if (counter) {
            counter.textContent = `${currentSlide + 1} / ${flashcards.length}`;
        }

        // Update track height to match active slide
        track.style.height = `${activeSlide.offsetHeight}px`;

        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 400);
    }

    function handleNavigation(direction) {
        if (isAnimating) return;

        if (direction === 'prev' && currentSlide > 0) {
            currentSlide--;
            updateSlides();
        } else if (direction === 'next' && currentSlide < flashcards.length - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function handleShuffle() {
        if (isAnimating) return;
        
        // Jump to a random flashcard (excluding current one if possible)
        let randomIndex;
        if (flashcards.length > 1) {
            do {
                randomIndex = Math.floor(Math.random() * flashcards.length);
            } while (randomIndex === currentSlide && flashcards.length > 1);
        } else {
            randomIndex = 0;
        }
        
        currentSlide = randomIndex;
        updateSlides();
        
        // Add visual feedback
        if (shuffleBtn) {
            shuffleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                shuffleBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Event listeners
    prevBtn?.addEventListener('click', () => handleNavigation('prev'));
    nextBtn?.addEventListener('click', () => handleNavigation('next'));
    
    // Shuffle button handling
    if (enableShuffle && shuffleBtn) {
        shuffleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleShuffle();
        });
        shuffleBtn.style.display = 'flex';
    }

    // Keyboard navigation - only respond to keys when not focused on a flashcard
    set.addEventListener('keydown', (e) => {
        const focusedElement = document.activeElement;
        const isFocusedOnCard = focusedElement.closest('.wp-block-smfcs-flashcard');
        
        if (!isFocusedOnCard) {
            if (e.key === 'ArrowLeft') handleNavigation('prev');
            if (e.key === 'ArrowRight') handleNavigation('next');
        }
    });

    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (flashcards[currentSlide]) {
            track.style.height = `${flashcards[currentSlide].offsetHeight}px`;
        }
    }, 250));

    // Initialize
    updateSlides();
}

// STACK MODE: Cards stacked with peek effect
function initializeStackMode(set, track, flashcards) {
    let currentIndex = 0;
    let isAnimating = false;

    const nav = set.querySelector('.flashcard-set-nav');
    const prevBtn = nav?.querySelector('.flashcard-nav-button.prev');
    const nextBtn = nav?.querySelector('.flashcard-nav-button.next');
    const counter = nav?.querySelector('.flashcard-set-counter');
    const shuffleBtn = nav?.querySelector('.flashcard-shuffle-button');

    const enableShuffle = set.getAttribute('data-enable-shuffle') === 'true';

    // Set total cards attribute for visual stack effect
    track.setAttribute('data-total-cards', flashcards.length);

    function updateStackPositions(direction = null) {
        if (isAnimating) return;
        isAnimating = true;

        // Add swipe animation class
        if (direction) {
            track.classList.add(`swipe-${direction}`);
        }

        // Update all cards
        flashcards.forEach((card, index) => {
            // Remove all classes first
            card.classList.remove('is-active', 'stack-1', 'stack-2');

            // Assign stack positions
            if (index === currentIndex) {
                card.classList.add('is-active');
            } else if (index === currentIndex + 1) {
                card.classList.add('stack-1');
            } else if (index === currentIndex + 2) {
                card.classList.add('stack-2');
            }
        });

        // Update navigation
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === flashcards.length - 1;
        
        // Update counter
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
        }

        // Reset animation state
        setTimeout(() => {
            isAnimating = false;
            track.classList.remove('swipe-left', 'swipe-right');
        }, 400);
    }

    function handleNavigation(direction) {
        if (isAnimating) return;

        if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
            updateStackPositions('right');
        } else if (direction === 'next' && currentIndex < flashcards.length - 1) {
            currentIndex++;
            updateStackPositions('left');
        }
    }

    function handleShuffle() {
        if (isAnimating) return;
        
        // Jump to a random flashcard (excluding current one if possible)
        let randomIndex;
        if (flashcards.length > 1) {
            do {
                randomIndex = Math.floor(Math.random() * flashcards.length);
            } while (randomIndex === currentIndex && flashcards.length > 1);
        } else {
            randomIndex = 0;
        }
        
        currentIndex = randomIndex;
        updateStackPositions();
        
        // Add visual feedback
        if (shuffleBtn) {
            shuffleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                shuffleBtn.style.transform = 'scale(1)';
            }, 150);
        }
    }

    // Event listeners
    prevBtn?.addEventListener('click', () => handleNavigation('prev'));
    nextBtn?.addEventListener('click', () => handleNavigation('next'));
    
    // Shuffle button handling
    if (enableShuffle && shuffleBtn) {
        shuffleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleShuffle();
        });
        shuffleBtn.style.display = 'flex';
    }

    // Keyboard navigation - only respond to keys when not focused on a flashcard
    set.addEventListener('keydown', (e) => {
        const focusedElement = document.activeElement;
        const isFocusedOnCard = focusedElement.closest('.wp-block-smfcs-flashcard');
        
        if (!isFocusedOnCard) {
            if (e.key === 'ArrowLeft') handleNavigation('prev');
            if (e.key === 'ArrowRight') handleNavigation('next');
        }
    });

    // Initialize
    updateStackPositions();
}

// GRID MODE: Show all cards in a grid layout
function initializeGridMode(set, track, flashcards) {
    // Show all cards
    flashcards.forEach(card => {
        card.classList.remove('is-active', 'prev', 'next', 'stack-1', 'stack-2');
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.position = 'relative';
        card.style.transform = 'none';
    });

    // Hide navigation since it's not needed in grid mode
    const nav = set.querySelector('.flashcard-set-nav');
    if (nav) {
        nav.style.display = 'none';
    }

    // Reset track styles
    track.style.height = 'auto';
    track.style.overflow = 'visible';
}

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeFlashcardSets();
    });
} else {
    initializeFlashcardSets();
}
