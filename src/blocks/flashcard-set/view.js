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

    function updateDisplay(direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        flashcards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('is-active');
                card.style.transform = 'translateX(0)';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            } else {
                card.classList.remove('is-active');
                card.style.transform = index < currentIndex ? 'translateX(-100%)' : 'translateX(100%)';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
            }
        });

        counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === flashcards.length - 1;

        // Update container height
        inner.style.height = `${flashcards[currentIndex].offsetHeight}px`;

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Initialize first card
    updateDisplay();

    // Event listeners
    prevButton?.addEventListener('click', () => {
        if (currentIndex > 0 && !isAnimating) {
            currentIndex--;
            updateDisplay('prev');
        }
    });

    nextButton?.addEventListener('click', () => {
        if (currentIndex < flashcards.length - 1 && !isAnimating) {
            currentIndex++;
            updateDisplay('next');
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