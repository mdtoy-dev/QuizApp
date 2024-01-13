var currentQuestionIndex = 0;
var timer;
var timeRemaining = 60;
var userScores = [];
var correctAnswers = 0;
var finalScore = 0;

document.getElementById('start').addEventListener('click', startQuiz);

function startQuiz() {
  startTimer();
  displayQuestion(quizQuestions[currentQuestionIndex]);

  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');
}

function startTimer() {
  timer = setInterval(function () {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById('time').textContent = timeRemaining;
}

function displayQuestion(question) {
  var questionTitle = document.getElementById('question-title');
  var choicesContainer = document.getElementById('choices');

  questionTitle.textContent = question.question;
  choicesContainer.innerHTML = '';

  question.options.forEach(function (option) {
    var choiceButton = document.createElement('button');
    choiceButton.textContent = option;
    choiceButton.addEventListener('click', function () {
      handleAnswerClick(option, question.correctAnswer);
    });
    choicesContainer.appendChild(choiceButton);
  });
}

function handleAnswerClick(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    console.log("Correct!");
    correctAnswers++;
    console.log(correctAnswers);
  } else {
    console.log("Incorrect!");
    timeRemaining -= 10;
    updateTimerDisplay();
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion(quizQuestions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function calculateFinalScore() {
  var totalQuestions = quizQuestions.length;
  var percentageCorrect = Math.floor((correctAnswers / totalQuestions) * 100);

  return percentageCorrect;
}

function endQuiz() {
  clearInterval(timer);

  document.getElementById('questions').classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');

  finalScore = calculateFinalScore();
  document.getElementById('final-score').textContent = finalScore;
}

document.getElementById('submit').addEventListener('click', function () {
  saveScore(finalScore);
  window.location.href = 'highscores.html';
});

function saveScore(score) {
  var initialsInput = document.getElementById('initials');
  var initials = initialsInput.value.trim(); // Trim whitespace from initials
  if (initials === '') {
    alert('Please enter your initials.');
    return;
  }

  userScores = JSON.parse(localStorage.getItem('userScores')) || [];

  var userScore = { initials: initials, score: score };
  userScores.push(userScore);

  localStorage.setItem('userScores', JSON.stringify(userScores));
}

