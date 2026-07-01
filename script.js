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
