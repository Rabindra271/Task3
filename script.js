const historicalFacts = [
    "The Indus Valley Civilization (3300-1300 BCE) had well-planned cities with advanced drainage systems.",
    "Emperor Ashoka converted to Buddhism after witnessing the horrors of the Kalinga War and spread Buddhism across Asia.",
    "The Taj Mahal was built by Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal.",
    "The Great Wall of India refers to the famous mountain range systems and forts built to defend kingdoms.",
    "Ajanta Caves are a collection of 30 Buddhist rock-cut caves containing some of the finest paintings of ancient India.",
    "The Chola Dynasty (9th-13th century) was a maritime superpower that controlled trade routes in Southeast Asia.",
    "Nalanda University was one of the world's first residential universities, established in the 5th century.",
    "The Delhi Sultanate introduced Indo-Islamic architecture, which later influenced Mughal design.",
    "Iron pillar of Delhi, built in the 4th-5th century, is famous for its rust-resistant iron.",
    "The Maurya Empire was one of the largest empires in ancient India, spanning from Afghanistan to Assam.",
    "Chandragupta Maurya defeated the Greek general Seleucus I Nicator, establishing Indian supremacy.",
    "The Gupta Period (320-550 CE) is considered the golden age of Indian culture and science.",
    "Aryabhata, the great mathematician and astronomer, calculated the value of pi to four decimal places.",
    "The Khmer Empire was influenced by Indian culture and Hinduism during the Southeast Asian expansion.",
    "Borobudur Temple in Indonesia was built with Indian architectural and Buddhist influences."
];

const questions = [
{
    question:"Which empire is known for building the Taj Mahal?",
    answers:[
        "Maurya Empire",
        "Mughal Empire",
        "Gupta Empire",
        "British Raj"
    ],
    correct:1
},
{
    question:"Who was the first emperor of the Maurya Empire?",
    answers:[
        "Ashoka",
        "Chandragupta Maurya",
        "Bindusara",
        "Samprati"
    ],
    correct:1
},
{
    question:"The Lion Capital of Ashoka is the national emblem of India. Which city was it originally placed in?",
    answers:[
        "Pataliputra",
        "Sarnath",
        "Varanasi",
        "Sanchi"
    ],
    correct:1
},
{
    question:"Who was the founder of the Gupta Empire?",
    answers:[
        "Samudragupta",
        "Chandragupta I",
        "Chandragupta II",
        "Skandagupta"
    ],
    correct:1
},
{
    question:"Which ancient text is the oldest known Sanskrit literature?",
    answers:[
        "Mahabharata",
        "Ramayana",
        "Rigveda",
        "Upanishads"
    ],
    correct:2
}
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement =
document.getElementById("question");

const answerButtons =
document.querySelectorAll(".option-btn");

const nextBtn =
document.getElementById("nextBtn");

const questionCounter =
document.getElementById("questionCounter");

const currentScoreDisplay =
document.getElementById("currentScore");

const scoreDisplay =
document.getElementById("scoreDisplay");

function loadQuestion(){

    let q = questions[currentQuestion];

    questionElement.innerText = q.question;
    
    questionCounter.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    answered = false;

    answerButtons.forEach((btn, index) => {
        btn.innerText = q.answers[index];
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong');

        btn.onclick = () => {
            if(!answered){
                answered = true;
                
                if(index === q.correct){
                    score++;
                    btn.classList.add('correct');
                }else{
                    btn.classList.add('wrong');
                    answerButtons[q.correct].classList.add('correct');
                }
                
                answerButtons.forEach(
                    button => button.disabled = true
                );
                
                currentScoreDisplay.innerText = `Score: ${score}/${questions.length}`;
            }
        };
    });
}

nextBtn.addEventListener("click",()=>{

    currentQuestion++;

    if(currentQuestion < questions.length){

        loadQuestion();

    }else{

        document.querySelector(".options")
        .style.display = "none";

        nextBtn.style.display = "none";
        
        questionCounter.style.display = "none";
        
        document.querySelector(".quiz-header")
        .style.borderBottom = "none";
        
        questionElement.style.display = "none";
        
        scoreDisplay.style.display = "block";
        
        const percentage = Math.round((score / questions.length) * 100);
        
        document.getElementById("finalScoreTitle").innerText = "🎉 Quiz Completed! 🎉";
        document.getElementById("finalScore").innerText = `${score}/${questions.length}`;
        
        if(percentage === 100){
            document.getElementById("scoreMessage").innerText = `Outstanding! You scored ${percentage}%. You are an Indian History Expert! 🏆`;
        }else if(percentage >= 80){
            document.getElementById("scoreMessage").innerText = `Excellent! You scored ${percentage}%. Great knowledge of Indian History! 🌟`;
        }else if(percentage >= 60){
            document.getElementById("scoreMessage").innerText = `Good! You scored ${percentage}%. Keep learning more about Indian History! 📚`;
        }else{
            document.getElementById("scoreMessage").innerText = `You scored ${percentage}%. Try again to improve your knowledge! 💪`;
        }
    }
});


const factBtn = document.getElementById("factBtn");
const factContainer = document.getElementById("factContainer");

factBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * historicalFacts.length);
    const randomFact = historicalFacts[randomIndex];
    factContainer.innerText = randomFact;
    factContainer.style.animation = "fadeIn 0.5s ease-in";
});

// Load first question on page load
loadQuestion();