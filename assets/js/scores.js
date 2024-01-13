function displayHighScores() {
    var highScoresContainer = document.getElementById('highscores');
    highScoresContainer.innerHTML = '';
  
    var storedUserScores = JSON.parse(localStorage.getItem('userScores')) || [];
    storedUserScores.sort(function (a, b) {
      return b.score - a.score;
    });
  
    storedUserScores.forEach(function (userScore) {
      var scoreItem = document.createElement('li');
      scoreItem.textContent = userScore.initials + ': ' + userScore.score;
      highScoresContainer.appendChild(scoreItem);
    });
}

displayHighScores();


function resetHighScores() {
    localStorage.removeItem('userScores');
    displayHighScores(); 
  }
 
  document.getElementById('clear').addEventListener('click', resetHighScores);
  