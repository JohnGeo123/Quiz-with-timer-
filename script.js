let totalTime = 10; 
  let timer;

  function startTimer() {
    document.getElementById("timer").innerHTML = `Time left: ${totalTime} seconds`;

    timer = setInterval(function() {
      totalTime--;

      if (totalTime <= 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "Time is gone!";
       
      } else {
        document.getElementById("timer").innerHTML = `Time left: ${totalTime} seconds`;
      }
    }, 1000);
  }

  (function() {
    var questions = [{
      question: "What is the capital of France?",
      choices: ["Berlin", "Madrid", "Paris", "Rome", "London"],
      correctAnswer: 2
    }, {
      question: "Who wrote 'Romeo and Juliet'?",
      choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain", "Leo Tolstoy"],
      correctAnswer: 1
    }, {
      question: "Which planet is known as the Red Planet?",
      choices: ["Venus", "Mars", "Jupiter", "Saturn", "Mercury"],
      correctAnswer: 1
    }, {
      question: "In what year did World War II end?",
      choices: ["1942", "1945", "1950", "1939", "1948"],
      correctAnswer: 1
    }, {
      question: "Who painted the Mona Lisa?",
      choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet", "Michelangelo"],
      correctAnswer: 2
    }];
    
    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 
    
    displayNext();
    
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      if (quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        clearInterval(timer); 
        totalTime = 10; 
        startTimer(); 
        displayNext();
      }
    });

    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if (quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      clearInterval(timer);
      totalTime = 10;
      startTimer();
      displayNext();
    });
    

    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if (quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      clearInterval(timer);
      totalTime = 10;
      startTimer();
      displayNext();
      $('#start').hide();
    });
    

    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
   
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    

    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    

    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    

    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if (questionCounter < questions.length) {
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if (questionCounter === 1) {
            $('#prev').show();
          } else if (questionCounter === 0) {
            $('#prev').hide();
            $('#next').show();
          }
        } else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    

    function displayScore() {
      var score = $('<p>', { id: 'question' });
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got ' + numCorrect + ' questions out of ' +
                   questions.length + ' right!!!');
      return score;
    }
  })();