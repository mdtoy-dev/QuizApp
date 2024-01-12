var currentQuestionIndex = 0;

document.getElementById('start').addEventListener('click', startQuiz);

function startQuiz() {
  startTimer();
  displayQuestion(quizQuestions[currentQuestionIndex]);

  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('questions').classList.remove('hide');
}

function startTimer() {

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
      handleAnswerClick(option);
    });
    choicesContainer.appendChild(choiceButton);
  });
}

function handleAnswerClick(selectedAnswer) {
  var currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    console.log("Correct!");
  } else {
    console.log("Incorrect!");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion(quizQuestions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById('questions').classList.add('hide');
  document.getElementById('end-screen').classList.remove('hide');

  var finalScore = calculateFinalScore(); 
  document.getElementById('final-score').textContent = finalScore;
}
