wp.domReady(() => {
    const updateVisibility = (wrapper, currentSlide) => {
        const flashcards = wrapper.querySelectorAll('.wp-block-smfcs-flashcard');
        flashcards.forEach((card, index) => {
            card.setAttribute('data-current', index === currentSlide);
        });
    };

    // Observer for attribute changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-current-slide') {
                const wrapper = mutation.target.closest('.wp-block-smfcs-flashcard-set');
                const currentSlide = parseInt(mutation.target.getAttribute('data-current-slide'), 10);
                updateVisibility(wrapper, currentSlide);
            }
        });
    });

    // Initialize and observe all flashcard sets
    document.querySelectorAll('.wp-block-smfcs-flashcard-set').forEach(set => {
        observer.observe(set, { attributes: true, subtree: true });
        updateVisibility(set, 0);
    });
}); 