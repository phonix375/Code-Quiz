var timerEl = document.querySelector('#timer');
var timer = 3;
var mainArea = document.querySelector('.main-area');
var questionIndex = -1;
var highScore = {
    name: "",
    score: 0,
};

var questions = [
    {
        'q': 'is the sky blue?',
        'answares':['1. yes','2. no','3. maybe'],
        'currectIndex': 1
    },
    {
        'q': 'is the Oseon blue?',
        'answares':['1. yes','2. no','3. maybe'],
        'currectIndex': 2
    
    },
]

var endGame = function(){
    mainArea.innerHTML ='';
    var resultDiv = document.createElement('div');
    var header = document.createElement('h1');
    header.textContent = 'Your score is ' + highScore.score;
    resultDiv.appendChild(header);
    mainArea.appendChild(resultDiv);
    window.clearInterval(window.myInterval)
}

// checks to see if this is the end of a list and if not prints the question to the main body with answar options
var nextQuestion= function(){
    
    questionIndex++;
    if(questionIndex < questions.length){
        mainArea.innerHTML ='';
        var questionContainer = document.createElement('div');
        questionContainer.innerHTML = '<h2>' + questions[questionIndex].q + '</h2>';
        var actionButtons = document.createElement('div');
        actionButtons.className = 'answareContainer';
        for(var i = 0; i< questions[questionIndex].answares.length;i++){
            var option = document.createElement('a');
            option.setAttribute('data-anser-index', i);
            option.className = 'btn answareBtn';
            option.textContent = questions[questionIndex].answares[i];
            actionButtons.appendChild(option)
        }
        questionContainer.appendChild(actionButtons);
        mainArea.appendChild(questionContainer);
    }
    else{
        endGame();
        return false;
    }

    

    return false;
}

var startClock = function(){
    window.myInterval = setInterval(function(){
        timerEl.textContent = timer;
        timer--;
        if (timer < 0){
            window.clearInterval(myInterval);
            endGame();
        }
    },1000)
};

var checkAnswar= function(index){
    if(questions[questionIndex].currectIndex === index+1){
        highScore.score++;
    }
    else{
        timer = timer - 5;
    }
    nextQuestion();
};
var clickEventHandler = function(event){
    if(event.target.matches('.start-btn')){
        startClock();
        nextQuestion()
    }
    if(event.target.matches('.answareBtn')){
        checkAnswar(parseInt(event.target.getAttribute('data-anser-index')));
    }

}


mainArea.addEventListener('click', clickEventHandler)
