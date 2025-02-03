function initializeFlashcards() {
    const flashcards = document.querySelectorAll('.flashcard-inner');

    flashcards.forEach(card => {
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

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
            }
        });
    });

    // Add Flashcard Set functionality
    const flashcardSets = document.querySelectorAll('.wp-block-smfcs-flashcard-set');
    
    flashcardSets.forEach(set => {
        const slides = set.querySelector('.flashcard-set-slides');
        const prevBtn = set.querySelector('.flashcard-set-nav .prev');
        const nextBtn = set.querySelector('.flashcard-set-nav .next');
        let currentSlide = 0;
        
        function updateSlides() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update button states
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === slides.children.length - 1;
        }
        
        prevBtn?.addEventListener('click', () => {
            currentSlide = Math.max(0, currentSlide - 1);
            updateSlides();
        });
        
        nextBtn?.addEventListener('click', () => {
            currentSlide = Math.min(slides.children.length - 1, currentSlide + 1);
            updateSlides();
        });
        
        // Initialize button states
        updateSlides();
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFlashcards);
} else {
    initializeFlashcards();
}
