const questions = [
    {
        question: "Когда был выпущен приказ, о подготовке бомбоубежищ?",
        optionA: "21 июня 1941 г.",
        optionB: "20 июня 1941 г.",
        optionC: "21 мая 1941 г.",
        optionD: "22 июня 1941 г.",
        correctOption: "optionA"
    },

    {
        question: "Когда началась Великая Отечественная война?",
        optionA: "22 июня 1941 г.",
        optionB: "1 июля 1941 г.",
        optionC: "1 августа 1941 г.",
        optionD: "1 сентября 1941 г.",
        correctOption: "optionA"
    },

    {
        question: "Кто был начальником оптико-сборочного цеха с момента его создания?",
        optionA: "А.Ф. Захарьевский",
        optionB: "В.А.Егоров",
        optionC: "Г.В. Погарев",
        optionD: "А.Н. Захарьевский",
        correctOption: "optionD"
    },

    {
        question: "Когда состоялся митинг в связи с началом войны?",
        optionA: "23 июня 1941 г",
        optionB: "25 июня 1941 г",
        optionC: "23 сентября 1941 г",
        optionD: "1 сентября 1941 г",
        correctOption: "optionA"
    },

    {
        question: "Что делали в оптико-сборочном цехе?",
        optionA: "Производили оптическе приборы",
        optionB: "Ремонтировали вооружение",
        optionC: "Проводили секретные исследования",
        optionD: "Выращивали овощи",
        correctOption: "optionB"
    },

    {
        question: "Когда началась блокада Ленинграда?",
        optionA: "22 июня 1941 г.",
        optionB: "8 сентября 1941 г.",
        optionC: "27 декабря 1943 г",
        optionD: "1 октября 1941 г.",
        correctOption: "optionB"
    },

    {
        question: "Какое здание ЛИТМО пострадало в результате немецкого обстрела в октябре 1941 года?",
        optionA: "Кронверкский пр., 49",
        optionB: "ул. Ломоносова, 9",
        optionC: "Демидов пер., д.10",
        optionD: "Кадетская лин. ВО, 3Б ",
        correctOption: "optionC"
    },

    {
        question: "Когда в ЛИТМО прибыла первая группа студентов после снятия блокады?",
        optionA: "май 1944 г.",
        optionB: "июнь 1944 г.",
        optionC: "июль 1944 г.",
        optionD: "август 1944 г.",
        correctOption: "optionA"
    },

    {
        question: "В каком году началась реэвакуация ЛИТМО?",
        optionA: "1943 г.",
        optionB: "1944 г.",
        optionC: "1945 г.",
        optionD: "1946 г.",
        correctOption: "optionB"
    },

    {
        question: "Когда вышел приказ о начале занятий студентов в эвакуации?",
        optionA: "январь 1944 г.",
        optionB: "февраль 1944 г.",
        optionC: "март 1945 г.",
        optionD: "январь 1943 г",
        correctOption: "optionD"
    },

    {
        question: "Когда закончилась блокада Ленинграда",
        optionA: "29 января 1944 г",
        optionB: "24 января 1944 г",
        optionC: "27 января 1944 г",
        optionD: "20 декабря 1943 г",
        correctOption: "optionC"
    }
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Можно еще раз прочитать информацию)"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Ого, хорошая память!"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Вау! Схватываешь все на лету"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}