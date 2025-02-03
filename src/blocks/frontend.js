function initializeFlashcards() {
    // Initialize flip functionality for all flashcards
    document.querySelectorAll('.flashcard-inner:not(.initialized)').forEach(card => {
        const frontSide = card.querySelector('.flashcard-front');
        const backSide = card.querySelector('.flashcard-back');

        function toggleFlip(e) {
            e.preventDefault(); // Prevent event bubbling
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
    document.querySelectorAll('.wp-block-smfcs-flashcard-set:not(.initialized)').forEach(set => {
        const track = set.querySelector('.flashcard-set-track');
        const prevBtn = set.querySelector('.flashcard-nav-button.prev');
        const nextBtn = set.querySelector('.flashcard-nav-button.next');
        const counter = set.querySelector('.flashcard-set-counter');
        const slides = Array.from(set.querySelectorAll('.wp-block-smfcs-flashcard'));
        let currentSlide = 0;

        function updateSlides() {
            if (!track) return;
            
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            if (prevBtn) prevBtn.disabled = currentSlide === 0;
            if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
            if (counter) counter.textContent = `${currentSlide + 1} / ${slides.length}`;
            
            // Ensure proper z-index and visibility
            slides.forEach((slide, index) => {
                slide.style.zIndex = index === currentSlide ? '1' : '0';
                slide.style.visibility = index === currentSlide ? 'visible' : 'hidden';
            });
        }

        function handlePrev(e) {
            e.preventDefault();
            if (currentSlide > 0) {
                currentSlide--;
                updateSlides();
            }
        }

        function handleNext(e) {
            e.preventDefault();
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlides();
            }
        }

        prevBtn?.addEventListener('click', handlePrev);
        nextBtn?.addEventListener('click', handleNext);

        // Initialize first slide
        updateSlides();
        set.classList.add('initialized');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFlashcards);
} else {
    initializeFlashcards();
}
