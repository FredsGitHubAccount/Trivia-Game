// Global Variables

var questions = [
    { q: "What color is the sky?", a:["Blue", "Green", "Yellow", "Purple"], c:"Blue" },
    { q: "What color is the apple?", a:["Blue", "Green", "Red", "Purple"], c:"Red"},
    { q: "What color is the orange?", a:["Blue", "Green", "Yellow", "Orange"], c:"Orange"},
  ];

let questionIndex = 0
let score = 0
let wrong = 0
let time = 30;


// New game resets all variables to zero and display a play button to get started.
const newGame = () => {
    questionIndex = 0
    score = 0
    wrong = 0
    $("#play-button").append("<button class='newgame'> Click here to play! </button>")

    $(".newgame").on("click", function() {
        renderQuestion()
        $("#play-button").empty()
    })
}

const renderQuestion = () => {

    // Run the render question function if there is a question remaining
        if (questionIndex < questions.length) {
            
        // Prints out key information for the user to see and inserts the called question and appends the answers
        $("#display-questions-text").html(questions[questionIndex].q)
        $("#score-text").text(`Total Correct : ${score}`);
        $("#wrong-text").text(`Total Wrong : ${wrong}`);
        $("#recap-text").empty();
        $("#directions-text").text("Click one of the answers to submit your guess!")

        for(let i = 0; i < questions[questionIndex].a.length; i++){
            $("#display-answers-text").append(`<p class='answer'>${questions[questionIndex].a[i]}</p>`)

        }

        // When the user clicks an answer, selected extracts the string from the chosen answer and compares it to the correct answer.  
        $(".answer").on("click", function() {
            var selected = $(this).text();
    
            if (selected === questions[questionIndex].c){
             
                score++;
                $(".all").empty();
                $("#recap-text").text("Congrats! You were right!")
                questionIndex++;
              
            }

            else if (time < 1) {
               
                wrong++;
                $(".all").empty()
                $("#recap-text").text(`You ran out of time! The right answer was ${questions[questionIndex].c}!`)
                questionIndex++;

            }
            else {
                
                wrong++;
                $(".all").empty()
                $("#recap-text").text(`Aww nice try! The right answer was ${questions[questionIndex].c}!`)
                questionIndex++;
                
                
            } 
            setTimeout(renderQuestion, 3000);
            
        })
        
    }
    else {
        $(".all").empty();
      
        $("#display-questions-text").text(`You finished the game! You got ${score} out of ${questions.length} correct!`);
        $("#display-answers-text").text("Click the button below to return to the main menu!")
        $("#play-button").append("<button class='newgame'>Main Menu</button>")

        $(".newgame").on("click", function() {
     
            $(".all").empty();
            newGame();
        })
  
    }
    }

    

newGame();

  





// 1. Hit a button to start a new game and display the first question.

// 2. Begin a timer and display the first question and potential answers.

// 3. The user has 30 seconds to select a potential answer.

// 4. If the user selects the correct or wrong answer, update their score and take them to a recap screen.

// 5.  Display the next question and repeat 4.

// 6.  Once the user runs out of questions, display their final score at the end and a button to reset the game.
