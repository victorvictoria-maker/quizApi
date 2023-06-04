const _categorySection = document.getElementById('choose-category');
const _categoryWrapper = document.querySelector('#choose-category ul');
const _categoryBtn = document.getElementById('select-category');
const _quetionSection = document.getElementById('que');
const _question = document.getElementById('the-question');
const _quetionCategory = document.querySelector('#question #category');
const _questionTrack = document.getElementById('question-track');
const _questionLeft = document.getElementById('question-left');
const _score = document.getElementById('correct-answer');
const _totalQuestion = document.getElementById('total-question');
const _options = document.getElementById('options');
const _submitAnswerBtn = document.getElementById('submit-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');

let categoryChosen = 'Any';
let APIUrl = 'https://opentdb.com/api.php?amount=10';
let questionsLeft = 10, score = 0, askedCount = 0, totalQuestion = 10;
let correctAnswer = '';


_categoryBtn.addEventListener('click', loadQuestion);
_submitAnswerBtn.addEventListener('click', submitAnswer);
_playAgainBtn.addEventListener('click', startGameAllOver);



document.addEventListener('DOMContentLoaded', () => {
    checkCategoryChosen();
});


function checkCategoryChosen() {
    _categoryWrapper.querySelectorAll('li').forEach((category) => {
        category.addEventListener('click', () => {
            //add selected style to categories
            category.style.listStyleType = 'none';
            if(_categoryWrapper.querySelector('.selected')) {
                const activeCategory = _categoryWrapper.querySelector('.selected');
                activeCategory.classList.remove('selected');
            }

            category.classList.add('selected');

            let choicePicked = category.innerHTML;
            if(choicePicked == '') {
                alert('Your category would be Any');
            } else {
                switch(choicePicked) {
                    case 'Sport':
                        categoryChosen = 'Sport';
                        APIUrl = 'https://opentdb.com/api.php?amount=10&category=21';
                        break;
                    case 'Geography':
                        categoryChosen = 'Geography';
                        APIUrl = 'https://opentdb.com/api.php?amount=10&category=22';
                        break;
                    case 'Politics':
                        categoryChosen = 'Politics';
                        APIUrl = 'https://opentdb.com/api.php?amount=10&category=24';
                        break;
                    case 'Art':
                        categoryChosen = 'Art';
                        APIUrl = 'https://opentdb.com/api.php?amount=10&category=25';
                        break;
                    case 'Animals':
                        categoryChosen = 'Animals';
                        APIUrl = 'https://opentdb.com/api.php?amount=10&category=27';
                        break;
                    case 'Celebrities':
                        categoryChosen = 'Celebrities';
                        APIUrl = 'https://opentdb.com/api.php?amount=10&category=26';
                        break;
                    case 'Music':
                        categoryChosen = 'Music';
                        APIUrl = 'https://opentdb.com/api.php?amount=10&category=12';
                        break;
                    case 'Any':
                        categoryChosen = 'Any';
                        APIUrl = 'https://opentdb.com/api.php?amount=10';
                        break;
                    default: 
                        categoryChosen = 'Any'; 
                        APIUrl = 'https://opentdb.com/api.php?amount=10';
                }
            }
        });
    }); 
};

async function loadQuestion() {
    const APIAddress = APIUrl;
    const result = await fetch(`${APIAddress}`);
    const data = await result.json();
    showQuestion(data.results[0]);
};

function showQuestion(data) {
    _categoryBtn.style.display = 'none';
    _submitAnswerBtn.style.display = 'block';
    _categorySection.style.display = 'none';
    _quetionSection.style.display = 'block';
    _questionTrack.style.display = 'block';


    _questionLeft.innerHTML = questionsLeft; 
    _score.innerHTML = score;
    _totalQuestion.innerHTML = totalQuestion;
    _question.innerHTML = data.question;
    _quetionCategory.innerHTML = data.category;
    _submitAnswerBtn.disabled = false;
    _result.style.display = 'none';

    correctAnswer = data.correct_answer;
    let incorrectAnswers = data.incorrect_answers; 
    let options = incorrectAnswers;
    options.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer);

    _options.innerHTML = `${options.map(
        (option, index) => `
            <li>${index+1}. <span>${option}</span></li>
        `
    ).join('')}`;


    selectAnswer();

};

function selectAnswer() {
    _options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            if(_options.querySelector('.selected')) {
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            };
            option.classList.add('selected');
        });
    });
};


function submitAnswer() {
    _result.style.display = 'block';
    if(_options.querySelector('.selected')){
        _submitAnswerBtn.disabled = true;
        let text = _options.querySelector('.selected span').innerHTML;

        if(text == correctAnswer) {
            score++;
            _result.innerHTML = `<p><i class="fas fa-check"></i>Correct answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect answer! <small>Correct answer: </small> ${correctAnswer}</p>`;
        };

        _score.innerHTML = score;
        questionsLeft--;

        getNextQuestion();
    } else {
        _result.innerHTML = `<p><i class="fa fas-question"></i>Please, choose an answer!</p>`;
    };
};
function getNextQuestion() {
    askedCount++;
    if(askedCount == totalQuestion) {
        _result.innerHTML += `<p>Your score is ${score}.</p>`;
        questionsLeft = 0;
        _playAgainBtn.style.display = 'block';
        _submitAnswerBtn.style.display = 'none';
    } else {
        setTimeout(() => {
            loadQuestion();
        }, 200);
    }
};

function startGameAllOver() {
    _categorySection.style.display = 'block'; 
    _quetionSection.style.display = 'none'; 
    _result.style.display = 'none';
    _playAgainBtn.style.display = 'none';
    _categoryBtn.style.display = 'block';
    _questionTrack.style.display = 'none';
    askedCount = 0; 
    score = 0;
    questionsLeft = 10;
}




