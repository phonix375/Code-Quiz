var timerEl = document.querySelector('#timer');
var timer = 60;
var mainArea = document.querySelector('.main-area');
var questionIndex = -1;

//keeps the score and name of the player
var highScore = {
    name: "",
    score: 0,
};

// list of all the questions with answer options and the correct answer
var questions = [
    {
        'q': 'Inside which HTML element do we put the javascript',
        'answares':['<scripting>','<javascript>','<js>','<script>'],
        'currectIndex': 4
    },
    {
        'q': 'What is the correct JavaScript syntax to change the content of the HTML element below?  <br> &lt p id="demo" &gt This is a demonstration.&lt/p&gt',
        'answares':['#demo.innerHTML = "Hellow World!"', ' document.getElementById("demo").innerHTML = "Hello World!";',' document.getElement("p").innerHTML = "Hello World!";',' document.getElementByName("p").innerHTML = "Hello World!";'],
        'currectIndex': 2
    
    },
    {
        'q': 'Where is the correct place to insert a JavaScript?',
        'answares':[' The <head> section',' The <body> section',' Both the <head> section and the <body> section are correct'],
        'currectIndex': 3
    
    },
    {
        'q': 'What is the correct syntax for referring to an external script called "xxx.js"?',
        'answares':[' <script href="xxx.js">',' <script src="xxx.js">',' <script name="xxx.js">'],
        'currectIndex': 2
    
    },
    {
        'q': 'The external JavaScript file must contain the &ltscript&gt tag.',
        'answares':['False','True'],
        'currectIndex': 1
    
    },
    {
        'q': 'How do you write "Hello World" in an alert box?',
        'answares':[' alert("Hello World");',' alertBox("Hello World");',' msg("Hello World");',' msgBox("Hello World");'],
        'currectIndex': 1
    
    },
    {
        'q': 'How do you create a function in JavaScript?',
        'answares':['function:myFunction()',' function myFunction()',' function = myFunction()'],
        'currectIndex': 2
    
    },
    {
        'q': 'How do you call a function named "myFunction"?',
        'answares':[' call function myFunction()',' call myFunction()','myFunction()'],
        'currectIndex': 3
    
    },
    {
        'q': 'How to write an IF statement in JavaScript?',
        'answares':[' if i = 5',' if i == 5 then',' if (i == 5)',' if i = 5 then'],
        'currectIndex': 3
    
    }
]

// clears the timer, checks if have a high score, and creates the form to add to the main
var endGame = function(){

    //checks if there is the hight score in local storage or the score is lower then the current one
    if(localStorage.getItem('highScore')) {
        if(highScore.score < parseInt(JSON.parse(localStorage.getItem('highScore')).score)){
            mainArea.innerHTML = ''
            var message = document.createElement('div');
            message.innerHTML = '<h1>Your Score is '+  highScore.score + '</h1><h2>Sorry you Didnt get the highest score</h2>'
            var cancel = document.createElement('a');
            cancel.className ='cancel btn';
            cancel.textContent = 'Retry';
            message.appendChild(cancel);
            mainArea.appendChild(message);
            window.clearInterval(window.myInterval);
            return false;
        }
       
    }
    
        mainArea.innerHTML ='';
        var resultDiv = document.createElement('div');
        var header = document.createElement('h1');
        header.textContent = 'Your score is ' + highScore.score;
        resultDiv.appendChild(header);
        
        var form = document.createElement('form');
        form.className = 'name-form';
      
        var inputLabel = document.createElement('label');
        inputLabel.setAttribute('for','name');
        inputLabel.innerHTML = 'What is your name<br>';
        form.appendChild(inputLabel);
        var input = document.createElement('input');
        input.setAttribute('id','name');
        form.appendChild(input);
        var save = document.createElement('a');
        save.setAttribute('type', "submit");
        save.className ='save btn';
        save.textContent = 'Submit'
        form.appendChild(save);
    
        var cancel = document.createElement('a');
        cancel.className ='cancel btn';
        cancel.textContent = 'Retry';
        form.appendChild(cancel);
    
        resultDiv.appendChild(form);
    
    
    
        mainArea.appendChild(resultDiv);

    
    //reset the time interval
    window.clearInterval(window.myInterval)
}

// checks to see if this is the end of a list and if not prints the question to the main body with answer options
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
    timerEl.textContent = timer;
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

//saves the name to to local storage
var saveName = function(){
    highScore.name = document.querySelector('#name').value;
    if (highScore.name === ''){
        alert('Please enter a name');
    }
    else{
        localStorage.setItem('highScore',JSON.stringify(highScore));
        alert('Thank you for taking the quiz');
        location.reload();
    }
};

//check for click events on main body
var clickEventHandler = function(event){

    //if you clicked the start button
    if(event.target.matches('.start-btn')){
        startClock();
        nextQuestion();
    }
    //if you clicked one of the answars
    if(event.target.matches('.answareBtn')){
        checkAnswar(parseInt(event.target.getAttribute('data-anser-index')));
    }
    //if you clicked the save after entering your name when done with the questioner
    else if(event.target.matches('.save')){
        saveName();
    }
    else if(event.target.matches('.cancel')){
        location.reload();
    }
}
var loadHighScore = function(){
    var oldHightScore = JSON.parse(localStorage.getItem('highScore'));
    if(oldHightScore){
        document.querySelector('.high-score-span').textContent = oldHightScore.score + ' by ' + oldHightScore.name;
    }
}

loadHighScore();
mainArea.addEventListener('click', clickEventHandler)
