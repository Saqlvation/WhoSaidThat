// variables to keep track of score
let score = 0;
let currentAnswer = '';
let currentQuoteText = '';

const Characters = [
    "Naruto Uzumaki", "Monkey D. Luffy", "Eren Yeager", "Goku", "Levi Ackerman",
    "Saitama", "Kakashi Hatake", "Light Yagami", "Killua Zoldyck", "Roronoa Zoro",
    "Mikasa Ackerman", "Tanjiro Kamado", "Nezuko Kamado", "Satoru Gojo", "Sukuna",
    "Kouichi Sakakibara", "Shigeo Kageyama", "Izuku Midoriya", "Shoto Todoroki", "Natsu Dragneel"
];
const quoteElement = document.getElementById("quote");
const scoreSpan = document.getElementById("scoreSpan");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("nextBtn");




/* 
async function fetchQuote() {
    quoteElement.textContent = "Loading the next quote..."; // just as placeholder


    try {
        const response = await fetch('https://api.animechan.io/v1/quotes/random');
        const result = await response.json();
        
        console.log("Live API Response:", result);
        
        if (result.status === "success" && result.data) {
            currentQuoteText = result.data.content;
            currentAnswer = result.data.character.name;
            
            // Display the quote in your blockquote element
            quoteElement.innerText = `"${currentQuoteText}"`;
            console.log("Correct answer :", currentAnswer);
        } else {
            quoteElement.innerText = "error";
        }
        
    } catch (error) {
        console.error("error", error);
        quoteElement.innerText = "error";
    }
}
fetchQuote();
*/
async function loadQuestion() {
    quoteElement.textContent = "Loading the next quote..."; // just as placeholder
    choicesContainer.innerHTML = '';
    nextButton.style.display = 'none'; // simplt hides it

    try {
        const response = await fetch('https://api.animechan.io/v1/quotes/random');
        const result = await response.json();
    
    if(result.status === "success" && result.data) {
        currentQuoteText = result.data.content;
        currentAnswer = result.data.character.name;

        // displays the quote
        quoteElement.innerText = `"${currentQuoteText}"`;

        // starts to build the choices
        generateChoices(currentAnswer);
    } else {
        quoteElement.innerText = "error";
    }
}catch (error) {
    console.error("error", error);
    quoteElement.innerText = "error";
}
}

function generateChoices(correctAnswer) {
    let wrongChoices = characters.filter(character => character !== correctAnswer);
    wrongChoices.sort(() => 0.5 - Math.random()); // shuffle the wrong choices
    let selectedWrongChoices = wrongChoices.slice(0, 3); // pick 3 wrong choices
    // combiness the correct answer with the wrong choices
    let allChoices = [correctAnswer, ...selectedWrongChoices];
    allChoices.sort(() => 0.5 - Math.random()); // shuffle all choices

    allChoices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn'); // to style the buttons
        button.addEventListener('click', () => handleChoiceClick(choice));
        choicesContainer.appendChild(button);
    });
}

function handleAnswers(selectedChoice, clickedButton) {
    const allButtons = choicesContainer.querySelectorAll('.choice-btn');
    allButtons.forEach(button => button.disabled = true); // disable all buttons 



    if(selectedChoice === currentAnswer) {
        score++;
        scoreSpan.textContent = score;
        clickedButton.style.backgroundColor = 'green';
    } else {
        clickedButton.style.backgroundColor = 'red';
        currentAnswerElement.textContent = `The correct answer was: ${currentAnswer}`;
    }
    nextButton.classList.remove("hidden");
    
}
// listens for the click and loads the next question
nextButton.addEventListener("click", loadQuestion);
// starts the game by loading the first question
loadQuestion();