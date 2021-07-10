
var temp = document.querySelector('.timer');
var button = document.querySelector("button");
var words = document.querySelector(".word-display");
var timerDiv = document.querySelector(".timer");
var scoreDiv = document.querySelector(".score");
var points = 0;
var spans;
var typed;
var seconds = 20;
var spark = new Audio("gamesong.mp3");

function countdown() {
    points = 0;
    var timer = setInterval(function(){
        button.disabled = true;
        seconds--;
        temp.innerHTML = seconds;
        if (seconds === 0) {
            spark.pause();
            alert("Game over! Your score is " + points);
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            button.disabled = false;
            clearInterval(timer);
            seconds = 20;
            timerDiv.innerHTML = "20";
            button.disabled = false;
        }
    }, 1000);
}

function random() {
    words.innerHTML = "";
    var random = Math.floor(Math.random() * (70 - 0 + 1)) + 0;
    var wordArray = list[random].split("");
    for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
}


const list = ['ACCOUNT','ACCURATE','ACRES','ACROSS','ACT','ACTION','ACTIVE','ACTIVITY',
'ACTUAL','ACTUALLY','ADD','ADDITION','ADDITIONAL','ADJECTIVE','ADULT','ADVENTURE',
'ADVICE','AFFECT','AFRAID','AFTER','AFTERNOON','AGAIN','AGAINST','AGE',
'AGO','AGREE','AHEAD','AID','AIR','AIRPLANE','ALIKE','ALIVE',
'ALL','ALLOW','ALMOST','ALONE','ALONG','ALOUD','ALPHABET','ALREADY',
'ALSO','ALTHOUGH','AM','AMONG','AMOUNT','ANCIENT','ANGLE','ANGRY',
'ANIMAL','ANNOUNCED','ANOTHER','ANSWER','ANTS','ANY','ANYBODY','ANYONE',
'ANYTHING','ANYWAY','ANYWHERE','APART','APARTMENT','APPEARANCE','APPLE','APPLIED',
'APPROPRIATE','ARE','AREA','ARM','ARMY','AROUND'];

button.addEventListener("click", function(e){
    countdown();
    random();
    button.disabled = true;
});
function typing(e) {
    typed = String.fromCharCode(e.which);
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) { // if typed letter is the one from the word
            if (spans[i].classList.contains("bg")) { // if it already has class with the bacground color then check the next one
                continue;
            } else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
                spans[i].classList.add("bg");
                break;
            }
        }
    }

    var checker = 0;
    for (var j = 0; j < spans.length; j++) { //checking if all the letters are typed
        if (spans[j].className === "span bg") {
            checker++;
        }

        if (checker === spans.length) { // if so, animate the words with animate.css class
            spark.pause();
            spark.play();
            words.classList.add("animated");
            words.classList.add("fadeOut");
            points++; // increment the points
            scoreDiv.innerHTML = points; //add points to the points div
            document.removeEventListener("keydown", typing, false);
            setTimeout(function(){
                words.className = "word-display"; // restart the classes
                random(); // give another word
                document.addEventListener("keydown", typing, false);
            }, 400);
        }
    }
}

document.addEventListener("keydown", typing, false);
