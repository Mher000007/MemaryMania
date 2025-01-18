
const cards = document.querySelectorAll(".card");
const showCardsButton = document.getElementById("showCardsButton");

let matchedCards = 0;
let cardOne, cardTwo;
let turnOffDesck = false;
let isCardsShown = false;

const matchAudio = new Audio('sound/Correct Answer sound effect.mp3');

function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !turnOffDesck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        turnOffDesck = true;
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        checkMatch(cardOneImg, cardTwoImg);
    }
}

function checkMatch(img1, img2) {
    if (img1 === img2) {
        matchedCards++;
        matchAudio.play();
        if (matchedCards === 8) {
            setTimeout(() => {
                xarnelKartery();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = null;
        turnOffDesck = false;
        return;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = null;
        turnOffDesck = false;
    }, 1200);
}

function xarnelKartery() {
    matchedCards = 0;
    cardOne = cardTwo = null;
    turnOffDesck = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    let shuffledCards = [...cards];
    shuffledCards.forEach((card, index) => {
        card.classList.remove("flip", "shake");
        let imgTag = card.querySelector("img")
        imgTag.src = `Crad/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
        let randomPos = Math.floor(Math.random() * shuffledCards.length);
        card.style.order = randomPos;
    });
}

xarnelKartery();

cards.forEach(card => {
    card.classList.remove("flip", "shake");
    card.addEventListener("click", flipCard);
});


showCardsButton.addEventListener("click", function() {
    if (isCardsShown) {
        return; 
    }

    cards.forEach(card => {
        card.classList.add("flip");
    });

    isCardsShown = true;
    showCardsButton.disabled = true;

    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove("flip");
        });
       
    }, 3000);
});
