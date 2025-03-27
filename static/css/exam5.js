let examStarted = false;
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const timerElement = document.getElementById('timer');
    const timeTakenElement = document.getElementById('timeTaken');
    const examContent = document.getElementById('examContent');
    const submitBtn = document.getElementById('submitBtn');
    const results = document.getElementById('results');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const reviewContent = document.getElementById('reviewContent');
    const scorePopup = document.getElementById('scorePopup');
    const scoreMessage = document.getElementById('scoreMessage');
    const completionTime = document.getElementById('completionTime');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const viewAnswersBtn = document.getElementById('viewAnswersBtn');
    const timeupPopup = document.getElementById('timeupPopup');
    const timeupProgress = document.getElementById('timeupProgress');
    const timeupMessage = document.getElementById('timeupMessage');
    const timeupViewAnswersBtn = document.getElementById('timeupViewAnswersBtn');
    const timeupTryAgainBtn = document.getElementById('timeupTryAgainBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    let isPaused = false;

    let timeLeft = 3900; // 65 minutes
    let timerInterval;
    let startTime;

    const correctAnswers = {
       
        q1: 'richtig',      // Zasem ist am 18. März von Kathmandu losgefahren.
        q2: 'richtig',      // Am zweiten Tag hat er durch einen Wald gefahren.
        q3: 'falsch',       // Zasem hat in Illam keinen Tee gekauft. (Er hat Tee gekauft.)
        q4: 'falsch',       // Die Fahrt war für Zasem sehr langweilig. (Es war ein Abenteuer.)
        q5: 'falsch',       // Er hatte am ersten Tag einen platten Reifen. (Es war am letzten Tag.)
        q6: 'richtig',      // Zasem hat die Teeplantagen in Illam besucht.
        
        q7: 'a',            // Was macht Lena jetzt seltener? a) Mit dem E-Scooter fahren.
        q8: 'c',            // Warum ist Lena morgens gestresst? b) Weil sie Autos und Fußgängern ausweichen muss.
        q9: 'a',            // Was rät Mia Lena? b) Sie soll mit dem Fahrrad fahren.
        q10: 'b',           // Was findet Tom spannend? b) Historische Orte in VR sehen.
        q11: 'b',           // Was passiert, wenn Tom weniger VR nutzt? b) Er hat mehr Zeit für Schule und Freunde.
        q12: 'a',           // Was sagt Frau Becker zu Tom? b) Er soll auch Zeit für andere Dinge haben.
        
        q13: 'f',           // Biraj möchte eine App, um Gitarre zu lernen. f) GUITAR PRO
        q14: 'd',           // Tika sucht eine App mit Meditation und Musik. d) ZEN BEATS
        q15: 'g',           // Awash möchte eine App mit nepalesischer Musik. g) NEPALI SOUNDS
        q16: 'a',           // Susan sucht eine App mit nachhaltigen Liedern. a) GREEN TUNES
        q17: 'c',           // Raveena möchte eine App, um Klavier zu üben. c) PIANO STAR
        q18: 'e',           // Bishnu sucht eine App für Reise-Playlists. e) TRAVEL VIBES
        q19: 'b',           // Zasem möchte eine App mit nepalesischen Kinderliedern. b) NEPALI KIDS
        
        q20: 'Nein',        // Sara: Prefers comfort over sustainability.
        q21: 'Ja',          // Lukas: Prefers comfort over sustainability.
        q22: 'Nein',        // Mia: Supports sustainability over comfort.
        q23: 'Ja',          // Tom: Prefers comfort over sustainability.
        q24: 'Nein',        // Anna: Supports sustainability over comfort.
        q25: 'Ja',          // Paul: Prefers comfort over sustainability.
        q26: 'Ja',          // Lisa: Supports sustainability over comfort.
        
        q27: 'a',           // Was können Besucher um 11 Uhr machen? a) An Koch-Workshops teilnehmen.
        q28: 'a',           // Wann endet das Festival? b) Um 19 Uhr.
        q29: 'c',           // Woher kommt das Essen während der Mittagspause? b) Von den Ständen oder aus eigenen Behältern.
        q30: 'c',           // Was passiert um 15 Uhr? c) Es gibt Vorträge über Klimawandel.
    };

    // Start Exam
    startBtn.addEventListener('click', function() {
        examStarted = true;
        startBtn.style.display = 'none'; // Ensure the button disappears
        examContent.style.display = 'block';
        startTime = Date.now();
        startTimer();
        enableOptions();
        timerElement.style.display = 'block';
    });

    function startTimer() {
        timerInterval = setInterval(function() {
            if (!isPaused) {
                let minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;
                timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                timeLeft--;

                if (timeLeft < 0) {
                    clearInterval(timerInterval);
                    timerElement.style.display = 'none';
                    showTimeupPopup();
                }
            }
        }, 1000);
    }

    // Pause/Resume Functionality
    pauseBtn.addEventListener('click', function() {
        if (!examStarted) return;
        isPaused = !isPaused;
        if (isPaused) {
            pauseBtn.textContent = '▶️';
            disableOptions();
        } else {
            pauseBtn.textContent = '⏸️';
            enableOptions();
        }
    });

    // Restart Functionality
    restartBtn.addEventListener('click', function() {
        if (!examStarted) return;
        window.location.reload(); // Reload the page to reset everything
    });

    // Enable Options
    function enableOptions() {
        document.querySelectorAll('.option.enabled').forEach(option => {
            option.removeEventListener('click', selectOption); // Prevent duplicate listeners
            option.addEventListener('click', selectOption);
            option.style.pointerEvents = 'auto';
        });
        document.querySelectorAll('.option-select.enabled').forEach(select => {
            select.removeEventListener('change', selectOption); // Prevent duplicate listeners
            select.addEventListener('change', selectOption);
            select.disabled = false;
        });
    }

    function disableOptions() {
        document.querySelectorAll('.option.enabled').forEach(option => {
            option.style.pointerEvents = 'none';
        });
        document.querySelectorAll('.option-select.enabled').forEach(select => {
            select.disabled = true;
        });
    }

    function selectOption() {
        if (this.tagName === 'SELECT') {
            this.classList.add('selected');
        } else {
            const siblings = this.parentElement.querySelectorAll('.option.enabled');
            siblings.forEach(sib => sib.classList.remove('selected'));
            this.classList.add('selected');
        }
    }

    // Submit Answers
    submitBtn.addEventListener('click', function() {
        if (!examStarted) {
            alert('Please click "Begin Exam" first!');
            return;
        }
        clearInterval(timerInterval);
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        let minutes = Math.floor(timeTaken / 60);
        let seconds = timeTaken % 60;
        timeTakenElement.textContent = `Time Taken: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeTakenElement.style.display = 'block';
        timerElement.style.display = 'none';
        calculateScore();
    });

    function calculateScore() {
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        document.querySelectorAll('.question').forEach(question => {
            const questionId = question.getAttribute('data-question');
            const selectedOption = question.querySelector('.option.selected');
            const selectedSelect = question.querySelector('.option-select.selected');

            if (selectedOption) {
                const userAnswer = selectedOption.getAttribute('data-value');
                if (userAnswer === correctAnswers[questionId]) score++;
            } else if (selectedSelect) {
                const userAnswer = selectedSelect.value;
                if (userAnswer === correctAnswers[questionId]) score++;
            }
        });

        const percentage = (score / totalQuestions) * 100;
        scoreDisplay.textContent = `${score}/${totalQuestions}`;
        completionTime.textContent = timeTakenElement.textContent;

        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${percentage}%`;

        if (percentage >= 80) {
            scoreMessage.textContent = 'Excellent! You have a strong understanding.';
        } else if (percentage >= 50) {
            scoreMessage.textContent = 'Good job! You might want to review some areas.';
        } else {
            scoreMessage.textContent = 'You may need to study more. Keep practicing!';
        }

        scorePopup.style.display = 'block';

        document.getElementById('shareBtn').addEventListener('click', function() {
            navigator.clipboard.writeText('www.zasim.com.np/german');
            alert('URL copied to clipboard: www.zasim.com.np/german');
        });

        // Add progress to top, matching the popup
        const headerSection = document.querySelector('.header-section');
        const existingProgress = document.querySelector('.top-progress');
        if (existingProgress) {
            existingProgress.remove(); // Remove existing progress to avoid duplicates
        }
        const progressDiv = document.createElement('div');
        progressDiv.classList.add('top-progress');
        progressDiv.innerHTML = `
            <div class="progress-bar">
            <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="score">${score}/${totalQuestions}</div>
            <div class="share-prompt">Screenshot and share progress with your friends!</div>
            <button id="tryAgainBtn" class="try-again-btn" onclick="window.location.reload();">Try Again</button>
            <button id="recommendBtn" class="popup-button">Recommend this site to your friends and family</button>
        `;
        headerSection.insertAdjacentElement('afterend', progressDiv);

        document.getElementById('recommendBtn').addEventListener('click', function() {
            navigator.clipboard.writeText('www.zasim.com.np/german');
            alert('URL copied to clipboard: www.zasim.com.np/german');
        });
    }

    function showTimeupPopup() {
        let score = 0;
        let answeredQuestions = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        document.querySelectorAll('.question').forEach(question => {
            const questionId = question.getAttribute('data-question');
            const selectedOption = question.querySelector('.option.selected');
            const selectedSelect = document.querySelector('.option-select.selected');

            if (selectedOption || selectedSelect) answeredQuestions++;
            if (selectedOption) {
                const userAnswer = selectedOption.getAttribute('data-value');
                if (userAnswer === correctAnswers[questionId]) score++;
            } else if (selectedSelect) {
                const userAnswer = selectedSelect.value;
                if (userAnswer === correctAnswers[questionId]) score++;
            }
        });

        const percentage = (score / totalQuestions) * 100;
        timeupProgress.textContent = `Your Progress: ${score}/${totalQuestions}`;
        timeupProgress.insertAdjacentHTML('afterend', `<p>You have completed ${answeredQuestions}/${totalQuestions} questions</p>`);

        const timeupProgressFill = document.getElementById('timeupProgressFill');
        timeupProgressFill.style.width = `${percentage}%`;

        if (percentage >= 80) {
            timeupMessage.textContent = 'Great effort! You managed to score well even with the time limit.';
        } else if (percentage >= 50) {
            timeupMessage.textContent = 'Not bad! Try to manage your time better next time.';
        } else {
            timeupMessage.textContent = 'Time management is key! Review and try again.';
        }

        timeupPopup.style.display = 'block';

        document.getElementById('timeupShareBtn').addEventListener('click', function() {
            navigator.clipboard.writeText('www.zasim.com.np/german');
            alert('URL copied to clipboard: www.zasim.com.np/german');
        });

        // Add progress to top for time-up scenario, matching the popup
        const headerSection = document.querySelector('.header-section');
        const existingProgress = document.querySelector('.top-progress');
        if (existingProgress) {
            existingProgress.remove(); // Remove existing progress to avoid duplicates
        }
        const progressDiv = document.createElement('div');
        progressDiv.classList.add('top-progress');
        progressDiv.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="score">${score}/${totalQuestions}</div>
           
             
            <div class="share-prompt">Screenshot and share progress with your friends!</div>
           <button id="tryAgainBtn" class="try-again-btn" onclick="window.location.reload();">Try Again</button>
            <button id="recommendBtn" class="popup-button">Recommend this site to your friends and family</button>
        `;
        headerSection.insertAdjacentElement('afterend', progressDiv);

        document.getElementById('recommendBtn').addEventListener('click', function() {
            navigator.clipboard.writeText('www.zasim.com.np/german');
            alert('URL copied to clipboard: www.zasim.com.np/german');
        });
    }

    viewAnswersBtn.addEventListener('click', function() {
        scorePopup.style.display = 'none';
        showReview();
    });

    timeupViewAnswersBtn.addEventListener('click', function() {
        timeupPopup.style.display = 'none';
        showReview();
    });

    function showReview() {
        submitBtn.style.display = 'none'; // Hide submit button to prevent resubmission
        results.style.display = 'none'; // Ensure the separate review section is not shown
        reviewContent.innerHTML = ''; // Clear any previous review content

        // Highlight selected answers with right/wrong indicators
        document.querySelectorAll('.question').forEach((question) => {
            const questionId = question.getAttribute('data-question');
            const selectedOption = question.querySelector('.option.selected');
            const selectedSelect = question.querySelector('.option-select.selected');
            let userAnswer = '';
            let isCorrect = false;

            if (selectedOption) {
                userAnswer = selectedOption.getAttribute('data-value');
                isCorrect = userAnswer === correctAnswers[questionId];
                const options = question.querySelectorAll('.option');
                options.forEach(opt => {
                    opt.classList.remove('selected');
                    if (opt.getAttribute('data-value') === userAnswer) {
                        opt.classList.add('review-selected');
                        opt.classList.add(isCorrect ? 'correct' : 'incorrect');
                    }
                });
            } else if (selectedSelect) {
                userAnswer = selectedSelect.value;
                isCorrect = userAnswer === correctAnswers[questionId];
                selectedSelect.classList.add('review-selected');
                selectedSelect.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });

        // Disable further interaction with options
        disableOptions();

        // Scroll to the top of the exam content
        examContent.scrollIntoView({ behavior: 'smooth' });
    }

    tryAgainBtn.addEventListener('click', function() {
        window.location.reload();
    });

    timeupTryAgainBtn.addEventListener('click', function() {
        window.location.reload();
    });

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            scorePopup.style.display = 'none';
            timeupPopup.style.display = 'none';
        });
    });
});

// Timer toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const timerContainer = document.querySelector('.timer-container');
    const timerToggle = document.querySelector('.timer-toggle');
    const toggleIcon = document.querySelector('.toggle-icon');
    const greenDot = document.querySelector('.green-dot');

    timerToggle.addEventListener('click', () => {
        // Toggle the hidden class
        timerContainer.classList.toggle('hidden');

        // Toggle between open and closed eye icons
        const currentState = toggleIcon.getAttribute('data-state');
        if (currentState === 'open') {
            toggleIcon.textContent = '👁️‍🟢'; // Closed eye
            toggleIcon.setAttribute('data-state', 'closed');
            greenDot.style.display = 'block'; // Show the green dot
        } else {
            toggleIcon.textContent = '👁️'; // Open eye
            toggleIcon.setAttribute('data-state', 'open');
            greenDot.style.display = 'none'; // Hide the green dot
        }
    });
});