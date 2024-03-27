

// ======== Game objects ======== //

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
    { name: "Rosetta Stone", weight: 0.762, size: "tiny" },
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

// ======== Scores (for the chart) ======== //
let categoryScores = [0, 0, 0, 0]; // Initialize with initial scores

// ======== Chart variables ======== //
var canvasElement = document.getElementById("scoreChart");
var config = {
    type: "bar",
    data: {
        labels: ["Animals", "Foods", "Culture", "Cars"],
        datasets: [{ label: "Score", data: [5, 2, 3, 4] }],
    },
};

// Javascript from chart.js
var scoreChart = new Chart(canvasElement, config)

// ======== Event listeners ========//
// listeners operand divs (left and righ guess-box)//
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

/**
 * Randomly picks objects to display on each side of the screen
 */
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
    // Apply multiplier to the smaller object
    let weightedThing1;
    let weightedThing2;
    if (thing1.weight <= thing2.weight) {
        const multiplier1 = calculateMultiplier(thing1.size);
        weightedThing1 = {
            name: `${multiplier1}x ${thing1.name}`,
            weight: thing1.weight * multiplier1
        };
        weightedThing2 = thing2;
    } else {
        const multiplier2 = calculateMultiplier(thing2.size);
        weightedThing2 = {
            name: `${multiplier2}x ${thing2.name}`,
            weight: thing2.weight * multiplier2
        };
        weightedThing1 = thing1;
    }
    
     // Display random thing for operand1 with multiplier
     const operand1Div = document.getElementById("operand1");
     operand1Div.textContent = weightedThing1.name;
     // Add weight data to the element
     operand1Div.dataset.weight = weightedThing1.weight; 
   
    // Display random thing for operand2 with multiplier
    const operand2Div = document.getElementById("operand2");
    operand2Div.textContent = weightedThing2.name; // Use weightedThing2 instead of thing2
    // Add weight data to the element
    operand2Div.dataset.weight = weightedThing2.weight; // Use weightedThing2 instead of thing2
}

/**
 * Function to get random things (Lion, apple, tower etc) inside category (Animals, Cars etc)
 * 
 */

function getRandomThing(category) {
    // Choose a random thing from the selected category
    return category[Math.floor(Math.random() * category.length)];
  }

/**
 * 
 * Multipliers for different object sizes
 */
function calculateMultiplier(size) {
    switch (size) {
        case "tiny":
            return Math.floor(Math.random() * 500) + 1;
        case "small":
            return Math.floor(Math.random() * 500) + 1;
        case "big":
            return Math.floor(Math.random() * 1500) + 1;
        default:
            return 1; // No multiplier for huge items
    }
}

 /**
  * By clicking you check the answer
  * Checks the answers for biggest weight
  * Checks the answers for their size (to add the multiplier to the smaller item)
  */
function checkAnswer(selectedAnswer) {
    // Get the weight of selected answer
    const selectedWeight = parseFloat(selectedAnswer.dataset.weight);

    // Get the weight of the other answer
    const otherWeight = parseFloat(selectedAnswer.id === "operand1" ? document.getElementById("operand2").dataset.weight : document.getElementById("operand1").dataset.weight);

    // Check if selected answer is correct
    if (selectedWeight > otherWeight) {
        incrementCategoryScores();
    } else {
        decrementCategoryScores();
    }

    // Display new question
    displayQuestion();
}



// ======== Score functions(for the chart) ======== //

// Update the chart data with the new scores
function updateChart() {
    scoreChart.data.datasets[0].data = categoryScores;
    scoreChart.update();
}

// When the player's score increases
function incrementCategoryScores() {
    for (let i = 0; i < categoryScores.length; i++) {
        categoryScores[i]++; // Increment all scores
    }
    updateChart(); // Update the chart with new scores
}

// When the player's score decreases
function decrementCategoryScores() {
    for (let i = 0; i < categoryScores.length; i++) {
        if (categoryScores[i] > 0) {
            categoryScores[i]--; // Decrease all scores, but ensure they don't go below 0
        }
    }
    updateChart(); // Update the chart with new scores
}




