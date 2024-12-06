// Import questions and answers
import { questionsAndAnswers } from './questions-and-answers.js';

// Initialize variables
let questionsSelected = [];
let score = 0;

// Select DOM elements
const questionsContainer = document.querySelector('#questions-container');
const answersContainer = document.querySelector('#answers-container');
const scoreContainer = document.querySelector('#score-container');

// Display categories at the start
showCategories();

// Function to display available categories
function showCategories() {
  updateQuestion("Choose a category:");
  clearContainer(answersContainer);
  clearContainer(scoreContainer);

  Object.keys(questionsAndAnswers).forEach((category) => {
    const option = createElement(
      'p', 
      { 
        className: 'answer', 
        textContent: category.toUpperCase() 
      }
    );
    option.addEventListener('click', () => selectCategory(category.toLowerCase()));
    answersContainer.appendChild(option);
  });
}

// Function to select a category and display the first question
function selectCategory(category) {
  if (!questionsAndAnswers[category]) {
    console.error(`Category "${category}" not found`);
    return;
  }
  // Create a copy of the questions array and shuffle it
  questionsSelected = shuffleArray([...questionsAndAnswers[category]]);
  score = 0;
  showQuestion(0);
}


// Function to display a question based on its index
function showQuestion(index) {
  if (index >= questionsSelected.length) {
    showResult();
    return;
  }
  const { question, answers, correctAnswer } = questionsSelected[index];
  updateQuestion(question);
  showOptions(answers, correctAnswer, index);
}

// Function to display answer options
function showOptions(answers, correctAnswer, questionIndex) {
  clearContainer(answersContainer);

  let optionSelected = false;
  // Create an array of answers and shuffle them
  const shuffledAnswers = shuffleArray([...answers]);
  
  shuffledAnswers.forEach((answer) => {
    const option = createElement('p', { className: 'answer', textContent: answer });
    option.addEventListener('click', () => {
      if (optionSelected) return;
      optionSelected = true;
      
      if (answer === correctAnswer) {
        option.classList.add('correct');
        score++;
      } else {
        option.classList.add('wrong');
      }

      setTimeout(() => showQuestion(questionIndex + 1), 500);
    });
    answersContainer.appendChild(option);
  });
}


// Function to display the final result
function showResult() {
  updateQuestion('');
  clearContainer(answersContainer);
  clearContainer(scoreContainer);

  const result = `<h2 class='total'>You got <span class="score">${score}</span> correct answers out of <span class="score">${questionsSelected.length}</span> questions.</h2>`;

  const resetButton = createElement('button', { id: 'reset', textContent: 'Reset' });
  resetButton.addEventListener('click', showCategories);

  const buttonContainer = createElement('div', { className: 'button-container' });
  buttonContainer.appendChild(resetButton);

  scoreContainer.innerHTML = result;
  scoreContainer.appendChild(buttonContainer);
}

// Function to update the displayed question
function updateQuestion(text) {
  questionsContainer.innerHTML = `<h2 class="question">${text}</h2>`;
}

// Function to clear a container
function clearContainer(container) {
  container.innerHTML = '';
}

// Function to create elements with attributes
function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') element.className = value;
    else element[key] = value;
  });
  return element;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

