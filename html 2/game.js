const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choiceContainers = Array.from(document.getElementsByClassName("choice-container"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const resim = document.getElementById("resim");

const urlSearchParams = new URLSearchParams(window.location.search);
const urlParams = Object.fromEntries(urlSearchParams.entries());

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
console.log(urlParams)
fetch(`http://localhost:3000/questions?bolge=${urlParams.altbolge}&altbolge=${urlParams.bolge}`)
   .then(res =>{
     return res.json();
})
   .then(loadedQuestions => {
    questions = loadedQuestions.map((loadedQuestion) => {
      const formattedQuestion = {
          resim: loadedQuestion.resim,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 5) + 1;
      answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
          formattedQuestion['choice' + (index + 1)] = choice;
      });

      return formattedQuestion;
  });
  console.log(questions)
     //questions = loadedQuestions;
     startGame();
})
.catch( err => {

}); 

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 50;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  question.src = currentQuestion.resim;

  choiceContainers.forEach(choice => {
    const number = choice.dataset["number"]; 
    choice.lastElementChild.innerText = currentQuestion["choice" + number];
   //choice.
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choiceContainers.forEach(choiceContainer => {
  choiceContainer.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

