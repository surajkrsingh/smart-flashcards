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
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFlashcards);
} else {
    initializeFlashcards();
}
