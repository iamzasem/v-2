document.addEventListener('DOMContentLoaded', function() {
    // Immediately show Teil 1 and animate chat bubbles
    const teil1 = document.querySelector('#teil1');
    if (teil1) {
        teil1.classList.add('visible'); // Ensure Teil 1 is visible

        // Animate chat bubbles in Teil 1
        const chatBubbles = teil1.querySelectorAll('.chat-bubble');
        chatBubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.classList.add('visible');
            }, index * 150); // 300ms delay between chat bubbles
        });
    }

    // Initially hide Teil 2 and Teil 3
    const teil2 = document.querySelector('#teil2');
    const teil3 = document.querySelector('#teil3');
    if (teil2) teil2.classList.add('hidden');
    if (teil3) teil3.classList.add('hidden');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }

    // Function to handle scroll and show Teil 2 and Teil 3
    function handleScroll() {
        // Show Teil 2 and animate slides
        if (teil2 && isInViewport(teil2) && !teil2.classList.contains('visible')) {
            teil2.classList.add('visible');
            const slides = teil2.querySelectorAll('.slide');
            slides.forEach((slide, index) => {
                setTimeout(() => {
                    slide.classList.add('visible');
                }, index * 50); // 150ms delay for faster slide animation
            });
        }

        // Show Teil 3 and animate Q&A cards
        if (teil3 && isInViewport(teil3) && !teil3.classList.contains('visible')) {
            teil3.classList.add('visible');
            const qaCards = teil3.querySelectorAll('.qa-card');
            qaCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 50); // 200ms delay for Q&A cards
            });
        }
    }

    // Check on scroll and initial load
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately in case Teil 2 or Teil 3 is already in view
});