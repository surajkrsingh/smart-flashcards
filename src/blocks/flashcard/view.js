document.addEventListener('DOMContentLoaded', function() {
    const flashcards = document.querySelectorAll('.wp-block-smfcs-flashcard');
    
    function setEqualHeights(flashcard) {
        const inner = flashcard.querySelector('.flashcard-inner');
        const front = flashcard.querySelector('.flashcard-front');
        const back = flashcard.querySelector('.flashcard-back');
        
        // Reset any previously set heights
        front.style.height = '';
        back.style.height = '';
        inner.style.height = '';
        
        // Get the natural heights
        const frontHeight = front.getBoundingClientRect().height;
        const backHeight = back.getBoundingClientRect().height;
        
        // Get the maximum height
        const maxHeight = Math.max(frontHeight, backHeight);
        
        // Set the heights
        front.style.height = `${maxHeight}px`;
        back.style.height = `${maxHeight}px`;
        inner.style.height = `${maxHeight}px`;
        flashcard.style.height = `${maxHeight}px`;
    }
    
    flashcards.forEach(flashcard => {
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