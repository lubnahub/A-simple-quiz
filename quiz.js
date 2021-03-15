const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText= document.getElementById("questionCounter");
const scoreText=document.getElementById("score");
var praisetext=document.getElementById("praises");

var currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  /*const loader = document.getElementById("loader");
  const game = document.getElementsByClassName("game");
  game.classList.remove("is-hidden");
  loader.classList.add("is-hidden");*/
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerHTML= `${questionCounter}/${MAX_QUESTIONS}`;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;
  

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};praisetext.innerHTML="Hi muggle!!!";

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if(classToApply=='correct'){
      incrementScore(CORRECT_BONUS);
      
    }
    if(score<10){
    praisetext.innerHTML="Muggle!";
    }    
    else if(score===10){
    praisetext.innerHTML="Not a muggle anymore.";
    } 
    else if(score===20){
    praisetext.innerHTML="Good!";
    } 
    
    else if( score === 30){
    praisetext.innerHTML="Yeah Okay";
    }
    
    else if(score=== 50){
    praisetext.innerHTML="Perhaps it's a Wit-Sharpening potion!";
    }

    else if(score===70){
    praisetext.innerHTML="You could ace the N.E.W.T.s";
    }
  
    else if(score===90){
    praisetext.innerHTML="Are you a Ravenclaw?";
    }
    else if(score===100){
    praisetext.innerHTML="Didn't expect you to reach this score.";
    }
    else if(score===120){
    praisetext.innerHTML="I am skeptical about you.";
    }
    else if(score===140){
    praisetext.innerHTML="This is definitely not your first attempt";
    }
    



    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num =>{
  score+=num;
  scoreText.innerHTML=score;
}
