const questions = [
    {
        q:"What is the largest and most massive planet in our solar system?",
        answers:[
            { text: "pluto", correct: false },
            { text: "jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "mercury", correct: false },
        ]
    },
    {
        q:"which is the bigst fish ",
        answers:[
            { text: "shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "octopus", correct: false },
            { text: "sting ray", correct: false },
        ]
    },
    {
        q:"which is the smallest city ",
        answers:[
            { text: "vatican", correct: true },
            { text: "india", correct: false },
            { text: "nepal", correct: false },
            { text: "sri lanka", correct: false },
        ]
    },
    {
        q:"which is the largest desert ",
        answers:[
            { text: "khalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: true },
            { text: "artic", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){ 
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.q;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    } );
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    //startQuiz();
}

function handleNextbutton(){
     currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }
});

startQuiz();