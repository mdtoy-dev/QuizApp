document.getElementById('start').addEventListener('click', startQuiz);

function startQuiz() {
  startTimer();
  displayQuestion(quizQuestions[0]);

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

  question.options.forEach((option, index) => {
    var choiceButton = document.createElement('button');
    choiceButton.textContent = option;
    choiceButton.addEventListener('click', () => handleAnswerClick(option));
    choicesContainer.appendChild(choiceButton);
  });
}

function handleAnswerClick(selectedAnswer) {

}
