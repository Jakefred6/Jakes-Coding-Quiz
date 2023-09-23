const questions = [
    {
        question: "What is JavaScript?",
        options: ["A programming language", "A type of coffee", "A car brand"],
        answer: "A programming language"
    },
    {
        question: "What is the purpose of the 'for' loop in JavaScript?",
        options: ["To define a function", "To make a decision", "To repeat a block of code", "To create an object"],
        answer: "To repeat a block of code"
    },
    {
        question: "What does 'JS' stand for?",
        options: ["JavaScript", "Just Saying", "JavaStyle"],
        answer: "JavaScript"
    },
    {
        question: "What is the primary purpose of JavaScript?",
        options: ["Styling web pages", "Enhancing user interfaces", "Server-side scripting"],
        answer: "Enhancing user interfaces"
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: ["let myVar;", "variable myVar;", "var myVar;"],
        answer: "var myVar;"
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        options: ["==", "===", "=", "!"],
        answer: "==="
    },
    {
        question: "What is an array in JavaScript?",
        options: ["A single value", "A collection of values", "A function"],
        answer: "A collection of values"
    },
    {
        question: "How do you comment a single line in JavaScript?",
        options: ["// This is a comment", "/* This is a comment */", "# This is a comment"],
        answer: "// This is a comment"
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length?",
        options: ["push()", "pop()", "join()"],
        answer: "push()"
    },
    {
        question: "What is the purpose of the 'if' statement in JavaScript?",
        options: ["To declare a variable", "To loop through an array", "To make decisions in code"],
        answer: "To make decisions in code"
    },
    {
        question: "Which function is used to output data in the console?",
        options: ["console.log()", "print()", "display()"],
        answer: "console.log()"
    },
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Model", "Dynamic Object Model"],
        answer: "Document Object Model"
    },    
    {
        question: "About how many lines of code are you able to write in Javascript?",
        options: ["1", "500", "225", "infinite"],
        answer: "infinite"
    }

]

    const startButton = document.getElementById("start-button");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const scoreContainer = document.getElementById("score-container");
    const highscoresList = document.getElementById("highscores-list");
    const questionCounter = document.getElementById("question-counter");
    const currentQuestionSpan = document.getElementById("current-question");
    const totalQuestionsSpan = document.getElementById("total-questions");
    let countdownContainer; // Declare countdownContainer as a global variable
    
    let currentQuestionIndex = 0;
    let timeLeft = 60;
    let score = 0;
    let timerInterval;
    let highScores = [];
    
    function startQuiz() {
        countdownContainer = document.getElementById("countdown-container"); // Assign countdownContainer here
        startButton.style.display = "none";
        countdownContainer.style.display = "block"; // Show the countdown container
        showQuestion();
        startTimer();
    }
    


function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h2>${question.question}</h2>
            <ul>
                ${question.options.map(option => `<li onclick="checkAnswer('${option}')">${option}</li>`).join("")}
            </ul>
        `;
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
        totalQuestionsSpan.textContent = questions.length;

    } else {
        endQuiz();
    }
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score += 10;
        resultContainer.textContent = "Correct yippie!";
    } else {
        timeLeft -= 10;
        resultContainer.textContent = "Wrong oopsies!";
    }

    currentQuestionIndex++;
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
        updateCountdown();
    }, 1000);
}

function updateCountdown(){
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    countdownContainer.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.innerHTML = "";
    resultContainer.innerHTML = "";
    scoreContainer.innerHTML = `<p>Your score: ${score}</p>`;
    
    // Save the high score to local storage
    const initials = prompt("Enter your initials:");
    if (initials) {
        const highscore = { initials, score };
        highScores.push(highscore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores();
    }
}

function displayHighScores() {
    highscoresList.innerHTML = "";
    const sortedHighScores = highScores.sort((a, b) => b.score - a.score);

    sortedHighScores.forEach((highscore, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${highscore.initials} - ${highscore.score}`;
        highscoresList.appendChild(listItem);
    });
}

startButton.addEventListener("click", startQuiz);
