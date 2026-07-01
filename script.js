// variables to keep track of score
let score = 0;
let lives = 3;
let currentAnswer = '';
let currentQuoteText = '';

const characters = [
    "Naruto Uzumaki", "Monkey D. Luffy", "Eren Yeager", "Goku", "Levi Ackerman",
    "Saitama", "Kakashi Hatake", "Light Yagami", "Killua Zoldyck", "Roronoa Zoro",
    "Mikasa Ackerman", "Tanjiro Kamado", "Nezuko Kamado", "Satoru Gojo", "Sukuna",
    "Kouichi Sakakibara", "Shigeo Kageyama", "Izuku Midoriya", "Shoto Todoroki", "Natsu Dragneel"
];
const quoteElement = document.getElementById("quote");
const scoreSpan = document.getElementById("scoreSpan");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("nextBtn");
const livesSpan = document.getElementById("livesSpan");




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






// Since the API is very rate limited i decided to use a local array of quotes 


async function loadQuestion() {
    quoteElement.textContent = "Loading the next quote...";
    choicesContainer.innerHTML = '';
    nextButton.style.display = 'none';
    
    try {
        const response = await fetch('https://api.animechan.io/v1/quotes/random');
        const result = await response.json();
        
        if(result.status === "success" && result.data) {
            currentQuoteText = result.data.content;
            currentAnswer = result.data.character.name;
            quoteElement.textContent = `"${currentQuoteText}"`;
            generateChoices(currentAnswer);
            return; 
        }
    } catch (error) {
        console.error("error:", error);
    }
    
    // runs this only if api fails
    useBackupQuote(); // function that starught up uses the backups
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
        button.addEventListener('click', () => handleAnswers(choice, button));
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
        clickedButton.style.color = 'white';
    } else {
        lives--;
        livesSpan.textContent = lives;
        clickedButton.style.backgroundColor = 'red';
        clickedButton.style.color = 'white';
        // for some reason copilot decided to add a random line that made no sense, fixed it ny making the button with the right answer turn green
        allButtons.forEach(button => {
            if(button.textContent === currentAnswer) {
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
            }
        });
    }
    nextButton.style.display = 'inline-block'; // shows the next button
    
}
function useBackupQuote() {
    
    const backupQuotes = [
    { quote: "If you don't take risks, you can't create a future!", character: "Monkey D. Luffy" },
    { quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win!", character: "Eren Yeager" },
    { quote: "I'm not gonna run away, I never go back on my word!", character: "Naruto Uzumaki" }
];
    
    // random backup quote
    const randomBackup = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
    currentQuoteText = randomBackup.quote;
    currentAnswer = randomBackup.character;
    quoteElement.textContent = `"${currentQuoteText}"`;
    generateChoices(currentAnswer);
}

// listens for the click and loads the next question
nextButton.addEventListener("click", loadQuestion);
// starts the game by loading the first question
loadQuestion();