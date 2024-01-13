var currentQuestionIndex = 0;
var timer;
var timeRemaining = 60; 

document.getElementById('start').addEventListener('click', startQuiz);

function startQuiz() {
  startTimer();
  displayQuestion(quizQuestions[currentQuestionIndex]);

  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');
}

function startTimer() {
  timer = setInterval(function() {
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

  question.options.forEach(function(option) {
    var choiceButton = document.createElement('button');
    choiceButton.textContent = option;
    choiceButton.addEventListener('click', function() {
      handleAnswerClick(option, question.correctAnswer);
    });
    choicesContainer.appendChild(choiceButton);
  });
}

function handleAnswerClick(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    console.log("Correct!");
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

function endQuiz() {
  clearInterval(timer);

  document.getElementById('questions').classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');

  var finalScore = calculateFinalScore(); 
  document.getElementById('final-score').textContent = finalScore;
}
