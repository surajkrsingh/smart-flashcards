document.addEventListener('DOMContentLoaded', function() {
    const flashcards = document.querySelectorAll('.wp-block-smfcs-flashcard');
    
    function setEqualHeights(flashcard) {
        const inner = flashcard.querySelector('.flashcard-inner');
        const front = flashcard.querySelector('.flashcard-front') || flashcard.querySelector('.wp-block-smfcs-flashcard-front');
        const back = flashcard.querySelector('.flashcard-back') || flashcard.querySelector('.wp-block-smfcs-flashcard-back');
        
        if (!front || !back) return;
        
        // Reset any previously set heights
        front.style.height = '';
        back.style.height = '';
        if (inner) inner.style.height = '';
        
        // Get the natural heights
        const frontHeight = front.getBoundingClientRect().height;
        const backHeight = back.getBoundingClientRect().height;
        
        // Get the maximum height
        const maxHeight = Math.max(frontHeight, backHeight);
        
        // Set the heights
        front.style.height = `${maxHeight}px`;
        back.style.height = `${maxHeight}px`;
        if (inner) inner.style.height = `${maxHeight}px`;
        flashcard.style.height = `${maxHeight}px`;
    }

    function initializeFlashcardFlip(flashcard) {
        const toggleFlip = (e) => {
            // Check if the clicked element or its parents is a clickable element
            const clickedElement = e.target;
            const isClickableElement = clickedElement.closest('a, button, .read-more-button, .flashcard-nav-button, .flashcard-shuffle-button');

            // Don't flip if clicking on interactive elements
            if (isClickableElement) {
                return;
            }

            // Stop event propagation to prevent conflicts with flashcard-set navigation
            e.stopPropagation();
            
            // Toggle the flip class
            flashcard.classList.toggle('is-flipped');
        };

        // Add click event listener
        flashcard.addEventListener('click', function(e) {
            const clickedElement = e.target;
            const isClickableElement = clickedElement.closest('a, button, .read-more-button, .flashcard-nav-button, .flashcard-shuffle-button');
            
            if (!isClickableElement) {
                toggleFlip(e);
            }
        });

        // Add keyboard event listener for accessibility
        flashcard.addEventListener('keydown', function(e) {
            const focusedElement = document.activeElement;
            const isInteractiveElement = focusedElement.matches('a, button, .read-more-button, [role="button"], [tabindex]');

            if (!isInteractiveElement && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggleFlip(e);
            }
        });

        // Make flashcard focusable for keyboard accessibility
        if (!flashcard.hasAttribute('tabindex')) {
            flashcard.setAttribute('tabindex', '0');
        }
        
        // Add ARIA attributes for accessibility
        flashcard.setAttribute('role', 'button');
        flashcard.setAttribute('aria-label', 'Flip flashcard to see other side');
    }
    
    flashcards.forEach(flashcard => {
        // Initialize flip functionality
        initializeFlashcardFlip(flashcard);
        
        // Set initial heights
        setEqualHeights(flashcard);
        
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            setEqualHeights(flashcard);
        }, 250));
        
        // Handle image loading
        flashcard.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => {
                setEqualHeights(flashcard);
            });
        });
        
        // Watch for content changes
        const observer = new MutationObserver(debounce(() => {
            setEqualHeights(flashcard);
        }, 250));
        
        observer.observe(flashcard, {
            subtree: true,
            childList: true,
            characterData: true
        });
    });
});

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