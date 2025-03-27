document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const timerElement = document.getElementById('timer');
    const timeTakenElement = document.getElementById('timeTaken');
    const examContent = document.getElementById('examContent');
    const submitBtn = document.getElementById('submitBtn');
    const results = document.getElementById('results');
    const submissionMessage = document.getElementById('submissionMessage');
    const reviewHeading = document.getElementById('reviewHeading');
    const statusSymbol = document.getElementById('statusSymbol');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const shareBtn = document.getElementById('shareBtn');
    const copyNotification = document.getElementById('copyNotification');
    const pauseBtn = document.getElementById('pauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    const textareas = document.querySelectorAll('.answer-textarea');
    const wordCounts = {
        answer1: document.getElementById('wordCount1'),
        answer2: document.getElementById('wordCount2'),
        answer3: document.getElementById('wordCount3')
    };
    const namePopup = document.getElementById('namePopup');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userCountryInput = document.getElementById('userCountry');
    const submitNameBtn = document.getElementById('submitNameBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const timeUpPopup = document.getElementById('timeUpPopup');
    const submitYesBtn = document.getElementById('submitYesBtn');
    const submitNoBtn = document.getElementById('submitNoBtn');
    const tryAgainPopupBtn = document.getElementById('tryAgainPopupBtn');

    let examStarted = false;
    let timeLeft = 3600; // 60 minutes
    let timerInterval;
    let startTime;
    let isPaused = false;
    let userName = '';
    let userEmail = '';
    let userCountry = '';

    // EmailJS Initialization
    (function() {
        emailjs.init("e0fxak7devdKywEUT"); // Replace with your EmailJS User ID (e.g., user_xyz789)
    })();

    // Show exam content initially (but disabled)
    examContent.style.display = 'block';
    document.querySelectorAll('.section').forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 200);
    });

    // Show popup when "Begin Exam" is clicked
    startBtn.addEventListener('click', function() {
        namePopup.style.display = 'block';
    });

    // Close popup when clicking the close button
    closePopupBtn.addEventListener('click', function() {
        namePopup.style.display = 'none';
        resetPopupInputs();
    });

    // Close popup when clicking outside the popup content
    namePopup.addEventListener('click', function(event) {
        if (event.target === namePopup) {
            namePopup.style.display = 'none';
            resetPopupInputs();
        }
    });

    // Reset popup inputs
    function resetPopupInputs() {
        userNameInput.value = '';
        userEmailInput.value = '';
        userCountryInput.value = '';
    }

    submitNameBtn.addEventListener('click', function() {
        userName = userNameInput.value.trim();
        userEmail = userEmailInput.value.trim();
        userCountry = userCountryInput.value.trim();
    
        if (userName === '' || userEmail === '' || userCountry === '') {
            alert('Bitte füllen Sie alle Felder aus.');
            return;
        }
    
        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(userEmail)) {
            alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            return;
        }
    
        examStarted = true;
        namePopup.style.display = 'none';
        startBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        startTime = Date.now();
        startTimer();
        enableTextareas();
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
                    showTimeUpPopup();
                }
            }
        }, 1000);
    }

    // Show Time-Up Popup
    function showTimeUpPopup() {
        timeUpPopup.style.display = 'block';
    }

    // Handle "Ja" (Yes) Button
    submitYesBtn.addEventListener('click', function() {
        timeUpPopup.style.display = 'none';
        submitAnswers();
    });

    // Handle "Nein" (No) Button
    submitNoBtn.addEventListener('click', function() {
        timeUpPopup.style.display = 'none';
        examContent.style.display = 'none';
        results.style.display = 'block';
        reviewHeading.textContent = 'Submission Confirmation';
        statusSymbol.className = 'status-symbol'; // Clear any previous classes
        submissionMessage.textContent = 'Thank you for writing';
        setTimeout(() => {
            window.location.reload();
        }, 3000); // Reload after 3 seconds
    });

    // Handle "Try Again" in Time-Up Popup
    tryAgainPopupBtn.addEventListener('click', function() {
        window.location.reload();
    });

    // Pause/Resume Functionality
    pauseBtn.addEventListener('click', function() {
        if (!examStarted) return;
        isPaused = !isPaused;
        if (isPaused) {
            pauseBtn.textContent = '▶️';
            disableTextareas();
        } else {
            pauseBtn.textContent = '⏸️';
            enableTextareas();
        }
    });

    // Restart Functionality
    restartBtn.addEventListener('click', function() {
        if (!examStarted) return;
        window.location.reload();
    });

    // Enable Textareas
    function enableTextareas() {
        textareas.forEach(textarea => {
            textarea.disabled = false;
            textarea.addEventListener('input', updateWordCount);
        });
    }

    function disableTextareas() {
        textareas.forEach(textarea => {
            textarea.disabled = true;
        });
    }

    // Update Word Count
    function updateWordCount() {
        const textareaId = this.id;
        const text = this.value.trim();
        const words = text === '' ? 0 : text.split(/\s+/).length;
        wordCounts[textareaId].textContent = words;
    }

    // Submit Answers (via "Submit" button or "Ja" in popup)
    submitBtn.addEventListener('click', function() {
        if (!examStarted) {
            alert('Please click "Begin Exam" first!');
            return;
        }
        submitAnswers();
    });

    function submitAnswers() {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        let minutes = Math.floor(timeTaken / 60);
        let seconds = timeTaken % 60;
        timeTakenElement.textContent = `Time Taken: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeTakenElement.style.display = 'block';
        timerElement.style.display = 'none';
    
        // Show loading animation
        examContent.style.display = 'none';
        submitBtn.style.display = 'none';
        results.style.display = 'block';
        loadingAnimation.style.display = 'flex';
    
        // Collect answers
        const answer1 = document.getElementById('answer1').value;
        const answer2 = document.getElementById('answer2').value;
        const answer3 = document.getElementById('answer3').value;
    
        // Create the custom message
        const customMessage = `This submission was made by ${userName} from ${userCountry}.`;
    
        // Log the data being sent for debugging
        console.log("Sending email with the following data:", {
            user_name: userName,
            user_email: userEmail,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            message: customMessage,
            
        });
    
        // Set a timeout for the emailjs.send call (e.g., 10 seconds)
        // Capture the submission time
        const submissionTime = new Date().toLocaleString();
        const sendEmailPromise = emailjs.send("ausnahme_bitte", "template_n6aiprg", {
            user_name: userName,
            user_email: userEmail,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            message: customMessage,
            time: submissionTime
        });
    
        // Add a timeout to the promise to prevent infinite loading
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("EmailJS request timed out after 10 seconds."));
            }, 10000); // 10 seconds timeout
        });
    
        // Race the emailjs.send promise against the timeout
        Promise.race([sendEmailPromise, timeoutPromise])
            .then(function(response) {
                // Success: Email sent
                loadingAnimation.style.display = 'none';
                reviewHeading.textContent = 'Submission Confirmation';
                statusSymbol.className = 'status-symbol success';
                submissionMessage.innerHTML = 'Your answer is submitted. Thank you for your answer.<br>We will review your answer and send you the result via email.';
                tryAgainBtn.style.display = 'block';
                shareBtn.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                console.log("Email sent successfully:", response);
            })
            .catch(function(error) {
                // Error: Email failed to send or timed out
                loadingAnimation.style.display = 'none';
                reviewHeading.textContent = 'Submission Failed';
                statusSymbol.className = 'status-symbol failure';
                submissionMessage.textContent = `Fehler beim Senden, ${userName}. Bitte versuchen Sie es erneut.`;
                tryAgainBtn.style.display = 'block';
                shareBtn.style.display = 'block';
                console.error("Error sending email:", error);
            });
    
        disableTextareas();
    }

    // Try Again Button
    tryAgainBtn.addEventListener('click', function() {
        window.location.reload();
    });

    // Share with Your Friends Button with Animation
    shareBtn.addEventListener('click', function() {
        const urlToCopy = 'www.zasim.com.np/german';
        navigator.clipboard.writeText(urlToCopy).then(() => {
            // Show the notification with animation
            copyNotification.classList.add('show');
            setTimeout(() => {
                copyNotification.classList.remove('show');
            }, 2000); // Notification disappears after 2 seconds
        }).catch(err => {
            console.error('Failed to copy URL:', err);
            submissionMessage.textContent = 'Failed to copy URL. Please try again.';
        });
    });

    // Timer Toggle Functionality
    const timerContainer = document.querySelector('.timer-container');
    const timerToggle = document.querySelector('.timer-toggle');
    const toggleIcon = document.querySelector('.toggle-icon');
    const greenDot = document.querySelector('.green-dot');

    timerToggle.addEventListener('click', () => {
        timerContainer.classList.toggle('hidden');
        const currentState = toggleIcon.getAttribute('data-state');
        if (currentState === 'open') {
            toggleIcon.textContent = '👁️‍🟢';
            toggleIcon.setAttribute('data-state', 'closed');
            greenDot.style.display = 'block';
        } else {
            toggleIcon.textContent = '👁️';
            toggleIcon.setAttribute('data-state', 'open');
            greenDot.style.display = 'none';
        }
    });
});