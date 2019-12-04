// Global Variables

var questions = [
    
    { q: "who is the author of harry potter?", a: ["george r.r. martin", "j.k. rowling", "neil gaiman", "stephen king"], c: "j.k. rowling" },
    { q: "which actor played the role of harry potter?", a: ["tim burton", "rupert grint", "tom felton", "daniel radcliffe"], c: "daniel radcliffe" },
    { q: "how many books were written in the harry potter series?", a: ["5", "6", "7", "8"], c: "7" },
    { q: "when was the first book published?", a: ["1996", "1997", "2000", "2001"], c: "1997" },
    { q: "what was the name of the last book published?", a: ["order of the phoenix", "deathly hallows", "sorcerer's stone", "half-blood prince"], c: "deathly hallows" },
    { q: "who was considered as the main antagonist?", a: ["voldemort", "professor snape", "draco malfoy", "albus dumbledore" ], c: "voldemort" },
    { q: "*hard question* how many staircases does hogwarts have?", a: ["156", "82", "13", "142"], c: "142" },
];

let questionIndex = 0
let score = 0
let wrong = 0
let time = 20;

// Variable to store my timer
let counter; 

// Stored audio file
var audio = new Audio(`assets/music/hptheme.mp3`)

// New game resets all variables to zero and displays a play button to get started
const newGame = () => {
    questionIndex = 0
    score = 0
    wrong = 0
    $("#display-questions-text").html("<h4 class='newgame col-md-4'> Click Here To Play! </h4>")
    $("#score-text").append(`Total Correct : ${score}`)
    $("#wrong-text").append(`Total Wrong: ${wrong}`);

        // Click event to start a new game
    $(".newgame").on("click", function () {
        $("#display-questions-text").empty()
        renderQuestion()
    })
}

// functino to render the questions onto the screen
const renderQuestion = () => {

    // Run the render question function if there is a question remaining
    if (questionIndex < questions.length) {
        audio.play()

        // Timer will update every 1 second
        counter = setInterval(timer, 1000);

        // Prints out key information for the user to see and inserts the called question and appends the answers
        $(".all").empty();
        $("#display-questions-text").html(`<h2 class="col-md-12 question"> ${questions[questionIndex].q}</h2>`)
        $("#score-text").text(`Total Correct : ${score}`);
        $("#wrong-text").text(`Total Wrong : ${wrong}`);
        $("#directions-text").html(`<h1 class="col-md-12 directions">Click one of the answers to submit your guess!</h2>`);
        $("#timer-text").html(`Remaining Time: ${time}`)

        // Run a for loop to append all the answers
        for (let i = 0; i < questions[questionIndex].a.length; i++) {
            $("#display-answers-text").append(`<h4 class='answer col-md-5'>${questions[questionIndex].a[i]}</h4>`)

        }


        // When the user clicks an answer, selected extracts the string from the chosen answer and compares it to the correct answer
        $(".answer").on("click", function () {

            // Storing the user's choice in a variable
            let selected = $(this).text();

            // If the selected text matches the text from the questions object, clear the counter, run a recap screen, increase the question index, and reset timer
            if (selected === questions[questionIndex].c) {

                clearInterval(counter);
                score++;
                $(".all").empty();
                $("#directions-text").html(`<h1 class="col-md-12 popup">1 Point to gryffindor!</h1>`)
                $("#directions-text").append(`<img src="https://media2.giphy.com/media/JvOEOg9u3ZGLK/source.gif">`);
                questionIndex++;
                time = 20;
            }
            // If the selected text doesn't match the text from the questions object, clear the counter, run a recap screen, increase the question index, and reset timer

            else {
                clearInterval(counter);
                wrong++;
                $(".all").empty()
                $("#directions-text").html(`<h1 class="col-md-12 popup"> Your wand has failed you! The right answer was ${questions[questionIndex].c}!</h1>`)
                $("#directions-text").append(`<img src="https://i.imgur.com/foqsuOG.gif">`);
                questionIndex++;
                time = 20;

            }
            // Set a timeout so there is time for the recap screen to occur and the timer to start once the next question is rendered
            setTimeout(renderQuestion, 5000);
            setTimeout(counter, 5000)
        })

    }
    // If there aren't any questions left, run a a recap screen of the user's score and the option to play again
    else {
        $(".all").empty();
        $("#directions-text").html(`<h1 class="col-md-12">You finished the game! You got ${score} out of ${questions.length} correct!</h1>`);
        $("#display-questions-text").html(`<h2 class="col-md-12">Click the button below to play again!</h2>`)
        $("#display-answers-text").html("<h3 class='col-md-4 newgame'>Play Again!</button></h3>")

        $(".newgame").on("click", function () {

            $(".all").empty();
            questionIndex = 0
            score = 0
            wrong = 0
            renderQuestion();
        })

    }
}
// Timer function to occur every second and an if statement if the user runs out of time.  If the user runs out of time, display a recap just like a wrong answer
function timer() {
    $("#timer-text").html(`Remaining Time: ${time}`);
    time--
   

    if (time < -1) {
        clearInterval(counter);
        $(".all").empty()
        $("#directions-text").html(`<h1 class="col-md-12 popup">You didn't flick your wand quick enough! The right answer was ${questions[questionIndex].c}!<h1>`)
        $("#directions-text").append(`<img src="https://66.media.tumblr.com/706576ce188ff312d0097f369335204d/tumblr_nt8pedAJxu1s6frvto1_400.gif">`);
        wrong++;
        questionIndex++;
        time = 20;
        setTimeout(renderQuestion,5000);
    }
    
}

// Called Function 
newGame();


// 1. Hit a button to start a new game and display the first question

// 2. Begin a timer and display the first question and potential answers

// 3. The user has 20 seconds to select a potential answer.

// 4. If the user selects the correct or wrong answer, update their score and take them to a recap screen.

// 5.  Display the next question and repeat 4.

// 6.  Once the user runs out of questions, display their final score at the end and a button to reset the game.
