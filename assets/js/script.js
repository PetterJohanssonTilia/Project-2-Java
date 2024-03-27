// ======== Game objects ============ //


const animals = [
    { name: "Elephant", weight: 5000, size: "big" },
    { name: "Giraffe", weight: 1800, size: "big" },
    { name: "Lion", weight: 190, size: "small" },
    { name: "Tiger", weight: 250, size: "small" },
    { name: "Gorilla", weight: 180, size: "small" }
];

const foods = [
    { name: "Apple", weight: 0.15, size: "tiny" },
    { name: "Chicken Breast", weight: 0.2, size: "tiny" },
    { name: "Broccoli", weight: 0.1, size: "tiny" },
    { name: "Salmon Fillet", weight: 0.18, size: "tiny" },
    { name: "Pizza", weight: 0.3, size: "tiny" }
];

const culturalObjects = [
    { name: "Eiffel Tower", weight: 7300, size: "huge" },
    { name: "Mona Lisa", weight: 0.8, size: "tiny" },
    { name: "Great Wall of China", weight: 70000000, size: "huge" },
    { name: "Rosetta Stone", weight: 0.762, size: "huge" },
    { name: "Taj Mahal", weight: 16340000, size: "huge" }
];

const cars = [
    { name: "Fiat 500", weight: 900, size: "big" },
    { name: "Hummer H1", weight: 3900, size: "big" },
    { name: "Smart Fortwo", weight: 750, size: "big" },
    { name: "Ford F-150", weight: 2300, size: "big" },
    { name: "Bugatti Chiron", weight: 1995, size: "big" }
];

const categories = [animals, foods, culturalObjects, cars];

// Global score variable
let score = 0;
let wrongAnswers = 0;

// Add event listeners to operand divs (left and righ guess-box)
document.getElementById("operand1").addEventListener("click", function() {
    checkAnswer(document.getElementById("operand1")); // Updated parameter passed to checkAnswer
});
document.getElementById("operand2").addEventListener("click", function() {
    checkAnswer(document.getElementById("operand2")); // Updated parameter passed to checkAnswer
});

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {


    runGame();
})


/**
 * The main game "loop", called when the script is first loaded
 * and after the user's Click/Answer has been processed
 */
function runGame(){
    displayQuestion();
}

function displayQuestion() {
    // Get random category for operand1 (Left question-box)
    const category1 = categories[Math.floor(Math.random() * categories.length)];
    // Get random thing from the chosen category for operand1
    const thing1 = getRandomThing(category1);
    // Get random category for operand2
    let category2;
    do {
      category2 = categories[Math.floor(Math.random() * categories.length)];
    } while (category1 === category2); // Ensure different categories
  
    // Get random thing from the chosen category for operand2
    const thing2 = getRandomThing(category2);
  
    // Display random thing for operand1
    const operand1Div = document.getElementById("operand1");
    operand1Div.textContent = thing1.name;
  
    // Display random thing for operand2
    const operand2Div = document.getElementById("operand2");
    operand2Div.textContent = thing2.name;
    
    // Set correct answer
    operand1Div.dataset.weight = thing1.weight;
    operand2Div.dataset.weight = thing2.weight;
}
 
function checkAnswer(selectedAnswer) {
    // Get the weight of selected answer
    const selectedWeight = parseFloat(selectedAnswer.dataset.weight);

    // Get the weight of the other answer
    const otherWeight = parseFloat(selectedAnswer.id === "operand1" ? document.getElementById("operand2").dataset.weight : document.getElementById("operand1").dataset.weight);

    // Check if selected answer is correct
    if (selectedWeight > otherWeight) {
        incrementScore();
    } else {
        incrementWrongAnswer();
    }

    // Display new question
    displayQuestion();
}

function incrementScore() {
    score++;
    document.getElementById("score").textContent = "Score: " + score;
}

function incrementWrongAnswer() {
    wrongAnswers++;
    document.getElementById("wrong-answers").textContent = "Wrong Answers: " + wrongAnswers;
}



/**
 * Function to get random things (Lion, apple, tower etc) inside category (Animals, Cars etc)
 * 
 */

  function getRandomThing(category) {
    // Choose a random thing from the selected category
    return category[Math.floor(Math.random() * category.length)];
  }

