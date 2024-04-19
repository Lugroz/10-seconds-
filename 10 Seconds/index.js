$(document).ready(function(){
  var currentQuestion;
  var interval = undefined;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
    if (score > highScore) {
      highScore = score;
      $('#high-score').text(highScore);
  }
  };
  
  var startGame = function () {
    clearInterval(interval);
    interval = setInterval(function () {
      updateTimeLeft(-1);
      if (timeLeft === 0) {
        clearInterval(interval);
        interval = undefined;
      }
    }, 1000);  
    
    if (timeLeft === 0) {
      updateTimeLeft(10);
      updateScore(-score);
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    var num1, num2, operation;

    var selectedOperations = [];
    if ($('#addition').is(':checked')) selectedOperations.push('+');
    if ($('#subtraction').is(':checked')) selectedOperations.push('-');
    if ($('#multiplication').is(':checked')) selectedOperations.push('*');
    if ($('#division').is(':checked')) selectedOperations.push('/');

    if (selectedOperations.length === 0) {
        alert("Please select at least one operation.");
        return null;
    }

    operation = selectedOperations[Math.floor(Math.random() * selectedOperations.length)];

    switch (operation) {
        case '+':
            num1 = randomNumberGenerator(10);
            num2 = randomNumberGenerator(10);
            break;
        case '-':
            num1 = randomNumberGenerator(20);
            num2 = randomNumberGenerator(num1);
            break;
        case '*':
            num1 = randomNumberGenerator(10);
            num2 = randomNumberGenerator(10);
            break;
        case '/':
            num2 = randomNumberGenerator(10);
            num1 = num2 * randomNumberGenerator(10);
            break;
    }
    switch (operation) {
        case '+':
            question.answer = num1 + num2;
            break;
        case '-':
            question.answer = num1 - num2;
            break;
        case '*':
            question.answer = num1 * num2;
            break;
        case '/':
            question.answer = num1 / num2;
            break;
    }

    question.equation = num1 + " " + operation + " " + num2;
    return question;
  };
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    if (currentQuestion !== null) {
      $('#equation').text(currentQuestion.equation);  
    }
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    var userInput = Number($(this).val());
    if (!isNaN(userInput)) {
      checkAnswer(userInput, currentQuestion.answer);
    }
  });
  
  renderNewQuestion();
});
