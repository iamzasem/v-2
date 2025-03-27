document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.exam-tab');
    const sections = document.querySelectorAll('.exam-section');
    const startButtons = document.querySelectorAll('.start-btn');
    const backButton = document.querySelector('.back-btn');

    // Tab switching with smooth transition
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('active')) return;

            // Remove active states
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active states to clicked tab and corresponding section
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
        });
    });

    // Start test navigation
    startButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const testUrl = e.currentTarget.getAttribute('data-url');
            window.location.href = testUrl;
        });
    });
// Back button navigation
backButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents default anchor behavior if needed
    window.location.href = 'german.html'; // Redirects to german.html
});

    // Optional: Add subtle hover effect on tabs
    tabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            if (!tab.classList.contains('active')) {
                tab.style.color = 'var(--primary-color)';
            }
        });

        tab.addEventListener('mouseleave', () => {
            if (!tab.classList.contains('active')) {
                tab.style.color = 'rgba(0, 0, 0, 0.6)';
            }
        });
    });
});