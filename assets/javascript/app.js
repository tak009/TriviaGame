// Declare global variables
var triviaArr = ["q1", "q2", "q3", "q4", "q5"];
var triviaObj = {
  q1: { question: "What is Earth's largest continent?", choices: ["ANTARCTICA", "AFRICA", "ASIA", "EUROPE"], answer: 3, correct_img:'assets/images/asia.jpg'},
  q2: { question: "What country has the most natural lakes?", choices: ["AUSTRALIA", "CANADA", "INDIA", "UNITED STATES"], answer: 2, correct_img:'assets/images/canada_lakes.jpg'},
  q3: { question: "What is the only sea without any coasts?", choices: ["ADRIATIC SEA", "CELEBES SEA", "MEDITERRANEAN SEA", "SARGASSO SEA"], answer: 4, correct_img:'assets/images/sargasso_sea.jpg'},
  q4: { question: "What is the driest place on Earth?", choices: ["ATACAMA DESERT", "MCMURDO, ANTARCTICA", "SAHARA DESERT", "KUFRA, LIBYA"], answer: 2, correct_img:'assets/images/macmurdo.jpg'},
  q5: { question: "What African country served as the setting for Tatooine in Star Wars?", choices: ["GABON", "GHANA", "TUNISIA", "ETHIOPIA"], answer: 3, correct_img:'assets/images/tataouine.jpg'}
};

var current_q = -1;
var time = 30;
var question;
var choices;
var answer;
var correct_img;
var intervalId;
var score = {'correct':0, 'wrong':0, 'unanswered':0};


$(document).ready(function(){
  // Display trivia question when click start
  $("#start-btn").on("click", function(){
    $(this).hide();
    $("#trivia-view").show();
    startTriviaGame();
  });

  $("#restart-btn").on("click", function(){
    startTriviaGame();
  });

});

function startTriviaGame(){
  current_q = -1;
  question = null;
  choices = null;
  answer = null;
  correct_img = null;
  intervalId = null;
  score = {'correct':0, 'wrong':0, 'unanswered':0};

  displayQuestion();
}

function displayQuestion(){
  current_q++;

  // Check if player answered every question
  if(current_q == triviaArr.length){
    stop();
    showSummary();
    return false;
  }

  $("#time-remaining").html("");
  $('#trivia-body').show();
  $('#trivia-result-correct').hide();
  $('#trivia-result-wrong').hide();
  $('#trivia-summary').hide();

  var questionSelected = triviaArr[current_q];
  question = triviaObj[questionSelected].question;
  choices = triviaObj[questionSelected].choices;
  answer = triviaObj[questionSelected].answer;
  correct_img = triviaObj[questionSelected].correct_img;

  console.log("current_q:", current_q);
  console.log("questionSelected:", questionSelected);
  console.log("question:", question);
  console.log("answer:", answer);

  time = 30;
  $("#time-remaining").html("<h4>Time Remaining:  " + time + " seconds</h4>");
  $("#question").html("<h4>" + question + "</h4>");
  $(".choices").html('');

  for(var i = 0; i < choices.length; i++){
    var list = $('<p class="choice">');
    list.attr("id","choice-" + (i+1));
    list.attr("choice",(i+1));
    list.text(choices[i]);
    $(".choices").append(list);
  }

  // Bind event to answer
  $('.choices p.choice').on('click', answerClick);
  runTime();
}

function answerClick(evt){
  var selected_ans = $(this).attr('choice');
  console.log('Answer selected', selected_ans);
  stop();

  // Compare answer to choice selected
  if(selected_ans == answer){
    score.correct++;
    showResult(true);
  }
  else{
    score.wrong++;
    showResult(false);
  }
}

function showResult(is_correct){
  $('#trivia-body').hide();

  if(is_correct){
    $('#trivia-result-correct div.img').css('background-image', 'url(' + correct_img + ')');
    $('#trivia-result-correct').show();
  }
  else{
    $('#trivia-result-wrong span.correct_answer').html(choices[answer-1]);
    $('#trivia-result-wrong div.img').css('background-image', 'url(' + correct_img + ')');
    $('#trivia-result-wrong').show();
  }

  setTimeout(displayQuestion, 5000);
}

function showSummary(){
  $("#time-remaining").html("");
  $('#trivia-body').hide();
  $('#trivia-result-correct').hide();
  $('#trivia-result-wrong').hide();
  $('#trivia-summary').show();

  $('#trivia-summary span.correct').html(score.correct);
  $('#trivia-summary span.wrong').html(score.wrong);
  $('#trivia-summary span.timeout').html(score.unanswered);
}

function getTriviaQuestion(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stop() {
  clearInterval(intervalId);
}

function runTime() {
  intervalId = setInterval(timeDecrement, 1000);
}

function timeDecrement() {
  if (time > 0){
    time--;
    $("#time-remaining").html("<h4>Time Remaining:  " + time + " seconds</h4>");

  }
  else {
    score.unanswered++;
    stop();
    $("#time-remaining").html("<h4>Out of Time !!!</h4>");
    showResult(false);
  }
}
