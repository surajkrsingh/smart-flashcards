function initializeFlashcards() {
    // Initialize flip functionality for all flashcards
    document.querySelectorAll('.flashcard-inner').forEach(card => {
        const frontSide = card.querySelector('.flashcard-front');
        const backSide = card.querySelector('.flashcard-back');

        function toggleFlip() {
            card.classList.toggle('is-flipped');
            const isFlipped = card.classList.contains('is-flipped');

            // Update ARIA hidden attributes
            frontSide.setAttribute('aria-hidden', isFlipped);
            backSide.setAttribute('aria-hidden', !isFlipped);

            // Update ARIA label
            const label = isFlipped ?
                'Flashcard back side - Click or press Enter to flip' :
                'Flashcard front side - Click or press Enter to flip';
            card.setAttribute('aria-label', label);
        }

        card.addEventListener('click', toggleFlip);
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
            }
        });
    });

    // Initialize slider functionality for flashcard sets
    document.querySelectorAll('.wp-block-smfcs-flashcard-set').forEach(set => {
        const slides = set.querySelector('.flashcard-set-slides');
        const prevBtn = set.querySelector('.flashcard-nav-button.prev');
        const nextBtn = set.querySelector('.flashcard-nav-button.next');
        const counter = set.querySelector('.flashcard-set-counter');
        let currentSlide = 0;
        const totalSlides = slides.children.length;
        
        function updateSlides() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
            counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }
        
        prevBtn?.addEventListener('click', () => {
            currentSlide = Math.max(0, currentSlide - 1);
            updateSlides();
        });
        
        nextBtn?.addEventListener('click', () => {
            currentSlide = Math.min(totalSlides - 1, currentSlide + 1);
            updateSlides();
        });
        
        // Initialize
        updateSlides();
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFlashcards);
} else {
    initializeFlashcards();
}
