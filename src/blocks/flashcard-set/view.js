document.addEventListener('DOMContentLoaded', function() {
    const flashcardSets = document.querySelectorAll('.wp-block-smfcs-flashcard-set.is-style-slide');
    
    flashcardSets.forEach(set => {
        let inner = set.querySelector('.flashcard-set-inner');
        if (!inner) {
            inner = document.createElement('div');
            inner.className = 'flashcard-set-inner';
            const flashcards = Array.from(set.querySelectorAll('.wp-block-smfcs-flashcard'));
            flashcards.forEach(card => inner.appendChild(card));
            set.insertBefore(inner, set.firstChild);
        }

        const flashcards = Array.from(inner.querySelectorAll('.wp-block-smfcs-flashcard'));
        if (!flashcards.length) return;
        
        let currentIndex = 0;
        let isAnimating = false;
        
        // Create navigation controls
        const controls = document.createElement('div');
        controls.className = 'flashcard-set-controls';
        
        const prevButton = document.createElement('button');
        prevButton.textContent = '← Previous';
        prevButton.disabled = true;
        
        const counter = document.createElement('span');
        counter.className = 'flashcard-counter';
        
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next →';
        
        controls.appendChild(prevButton);
        controls.appendChild(counter);
        controls.appendChild(nextButton);
        set.appendChild(controls);
        
        function updateDisplay(direction = 'next') {
            if (isAnimating) return;
            isAnimating = true;

            // Remove all state classes
            flashcards.forEach(card => {
                card.classList.remove('is-active', 'prev', 'next');
            });
            
            // Set positions based on direction
            const prevIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
            const nextIndex = (currentIndex + 1) % flashcards.length;
            
            // Add appropriate classes
            if (flashcards[prevIndex]) flashcards[prevIndex].classList.add('prev');
            if (flashcards[nextIndex]) flashcards[nextIndex].classList.add('next');
            
            // Set active card
            const activeCard = flashcards[currentIndex];
            activeCard.classList.add('is-active');
            
            // Update counter
            counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
            
            // Update button states
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === flashcards.length - 1;
            
            // Update container height
            inner.style.height = `${activeCard.offsetHeight}px`;

            // Reset animation flag after transition
            setTimeout(() => {
                isAnimating = false;
            }, 500); // Match this with your CSS transition duration
        }
        
        // Initialize first card
        updateDisplay();
        
        // Navigation handlers
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0 && !isAnimating) {
                currentIndex--;
                updateDisplay('prev');
            }
        });
        
        nextButton.addEventListener('click', () => {
            if (currentIndex < flashcards.length - 1 && !isAnimating) {
                currentIndex++;
                updateDisplay('next');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!set.contains(document.activeElement)) return;
            
            if (e.key === 'ArrowLeft' && currentIndex > 0 && !isAnimating) {
                currentIndex--;
                updateDisplay('prev');
            } else if (e.key === 'ArrowRight' && currentIndex < flashcards.length - 1 && !isAnimating) {
                currentIndex++;
                updateDisplay('next');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', debounce(() => updateDisplay(), 250));
        
        // Handle content changes
        const observer = new MutationObserver(debounce(() => updateDisplay(), 250));
        observer.observe(inner, {
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