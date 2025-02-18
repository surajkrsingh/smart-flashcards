function initializeFlashcards() {
    // Shuffle array utility function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

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
        const shuffleBtn = set.querySelector('.flashcard-shuffle-button');
        let slides = Array.from(set.querySelectorAll('.wp-block-smfcs-flashcard'));
        let currentSlide = 0;
        
        const displayMode = set.dataset.displayMode || 'slide';
        const enableShuffle = set.dataset.enableShuffle === 'true';

        function updateCounter() {
            if (counter) {
                counter.textContent = `${currentSlide + 1} / ${slides.length}`;
            }
        }

        function updateSlides() {
            if (!track) return;
            
            if (displayMode === 'slide') {
                track.style.transform = `translateX(-${currentSlide * 100}%)`;
                slides.forEach((slide, index) => {
                    slide.style.transform = '';
                    slide.style.zIndex = '';
                    slide.style.opacity = '';
                });
            } else if (displayMode === 'stack') {
                track.style.transform = '';
                slides.forEach((slide, index) => {
                    const offset = index - currentSlide;
                    const scale = 1 - Math.abs(offset) * 0.05;
                    const translateY = offset * 10;
                    const translateZ = -Math.abs(offset) * 20;
                    
                    slide.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`;
                    slide.style.zIndex = slides.length - Math.abs(offset);
                    slide.style.opacity = 1 - Math.abs(offset) * 0.2;
                });
            }
            
            // Update navigation state
            if (prevBtn) prevBtn.disabled = currentSlide === 0;
            if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
            updateCounter();
        }

        function handleShuffle() {
            slides = shuffleArray([...slides]);
            currentSlide = 0;
            
            // Reorder DOM elements
            slides.forEach(slide => track.appendChild(slide));
            updateSlides();
            updateCounter(); // Update counter after shuffle
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

        // Add event listeners
        prevBtn?.addEventListener('click', handlePrev);
        nextBtn?.addEventListener('click', handleNext);
        
        if (enableShuffle && shuffleBtn) {
            shuffleBtn.addEventListener('click', handleShuffle);
            shuffleBtn.style.display = 'block';
        }

        // Initialize first slide
        updateSlides();
        set.classList.add('initialized');

        // Add keyboard navigation
        set.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') handlePrev(e);
            if (e.key === 'ArrowRight') handleNext(e);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFlashcards);
} else {
    initializeFlashcards();
}
