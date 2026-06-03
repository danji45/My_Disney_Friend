/* ========================= */
/* NAVIGATIE */
/* ========================= */

const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const chooseCharacterButton = document.getElementById("chooseCharacterButton");
const friendshipsButton = document.getElementById("friendshipsButton");

const backToHomeButton = document.getElementById("backToHomeButton");
const navHomeButton = document.getElementById("navHomeButton");
const navCharactersButton = document.getElementById("navCharactersButton");

if (startButton) {
    startButton.addEventListener("click", function () {
        window.location.href = "home.html";
    });
}

if (backButton) {
    backButton.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}

if (chooseCharacterButton) {
    chooseCharacterButton.addEventListener("click", function () {
        window.location.href = "characters.html";
    });
}

if (friendshipsButton) {
    friendshipsButton.addEventListener("click", function () {
        window.location.href = "friendships.html";
    });
}

if (backToHomeButton) {
    backToHomeButton.addEventListener("click", function () {
        window.location.href = "home.html";
    });
}

if (navHomeButton) {
    navHomeButton.addEventListener("click", function () {
        window.location.href = "home.html";
    });
}

if (navCharactersButton) {
    navCharactersButton.addEventListener("click", function () {
        window.location.href = "friendships.html";
    });
}


/* ========================= */
/* CHARACTERS LIJST */
/* ========================= */

const characters = [
    {
        name: "mickey",
        displayName: "Mickey Mouse",
        image: "images/character/mickey.png",
        friendship: 2
    },
    {
        name: "minnie",
        displayName: "Minnie Mouse",
        image: "images/character/minnie.png",
        friendship: 0
    },
    {
        name: "stitch",
        displayName: "Stitch",
        image: "images/character/stitch.png",
        friendship: 0
    },
    {
        name: "olaf",
        displayName: "Olaf",
        image: "images/character/olaf.png",
        friendship: 3
    },
    {
        name: "ariel",
        displayName: "Ariel",
        image: "images/character/ariel.png",
        friendship: 5
    },
    {
        name: "buzz_lightyear",
        displayName: "Buzz Lightyear",
        image: "images/character/buzz_lightyear.png",
        friendship: 1
    },
    {
        name: "rapunzel",
        displayName: "Rapunzel",
        image: "images/character/rapunzel.png",
        friendship: 0
    },
    {
        name: "elsa",
        displayName: "Elsa",
        image: "images/character/elsa.png",
        friendship: 3
    }
];


/* ========================= */
/* VRIENDSCHAP HELPERS */
/* ========================= */

function getFriendshipLevel(characterKey) {
    const savedLevel = localStorage.getItem(`friendship_${characterKey}`);

    if (savedLevel !== null) {
        return Number(savedLevel);
    }

    const character = characters.find(function (item) {
        return item.name === characterKey;
    });

    return character ? character.friendship || 0 : 0;
}

function saveFriendshipLevel(characterKey, level) {
    localStorage.setItem(`friendship_${characterKey}`, level);
    localStorage.setItem("selectedCharacterFriendship", level);
}

function createHearts(level) {
    let hearts = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= level) {
            hearts += `<span class="heart filled">♥</span>`;
        } else {
            hearts += `<span class="heart">♡</span>`;
        }
    }

    return hearts;
}


/* ========================= */
/* CHARACTER SELECTIE */
/* ========================= */

const characterContent = document.getElementById("characterContent");
const savedCharacter = localStorage.getItem("selectedCharacter");

if (characterContent) {
    characters.forEach(function (character) {
        const card = document.createElement("article");
        card.classList.add("character-card");

        if (savedCharacter === character.name) {
            card.classList.add("selected");
        }

        card.innerHTML = `
            <img src="${character.image}" alt="${character.displayName}" class="character-image">
            <h2>${character.displayName}</h2>
        `;

        card.addEventListener("click", function () {
            const allCards = document.querySelectorAll(".character-card");

            allCards.forEach(function (otherCard) {
                otherCard.classList.remove("selected");
            });

            card.classList.add("selected");

            const friendshipLevel = getFriendshipLevel(character.name);

            localStorage.setItem("selectedCharacter", character.name);
            localStorage.setItem("selectedCharacterName", character.displayName);
            localStorage.setItem("selectedCharacterImage", character.image);
            localStorage.setItem("selectedCharacterFriendship", friendshipLevel);

            window.location.href = "ar-scan.html";
        });

        characterContent.appendChild(card);
    });
}


/* ========================= */
/* CHARACTER VRIENDSCHAPPEN */
/* ========================= */

const friendshipContent = document.getElementById("friendshipContent");

if (friendshipContent) {
    characters.forEach(function (character) {
        const friendshipLevel = getFriendshipLevel(character.name);

        const card = document.createElement("article");
        card.classList.add("friendship-card");

        if (friendshipLevel === 5) {
            card.classList.add("best-friend");
        }

        card.innerHTML = `
            <div class="friendship-image-box">
                <img src="${character.image}" alt="${character.displayName}" class="friendship-image">
            </div>

            <div class="friendship-hearts">
                ${createHearts(friendshipLevel)}
            </div>
        `;

        card.addEventListener("click", function () {
            localStorage.setItem("selectedCharacter", character.name);
            localStorage.setItem("selectedCharacterName", character.displayName);
            localStorage.setItem("selectedCharacterImage", character.image);
            localStorage.setItem("selectedCharacterFriendship", friendshipLevel);

            window.location.href = "friendship-detail.html";
        });

        friendshipContent.appendChild(card);
    });
}


/* ========================= */
/* VRIENDSCHAP DETAIL PAGINA */
/* ========================= */

const backToFriendshipsButton = document.getElementById("backToFriendshipsButton");
const detailCharacterImage = document.getElementById("detailCharacterImage");
const detailCharacterName = document.getElementById("detailCharacterName");
const detailHearts = document.getElementById("detailHearts");

if (backToFriendshipsButton) {
    backToFriendshipsButton.addEventListener("click", function () {
        window.location.href = "friendships.html";
    });
}

if (detailCharacterImage && detailCharacterName && detailHearts) {
    const selectedCharacter = localStorage.getItem("selectedCharacter") || "olaf";
    const selectedName = localStorage.getItem("selectedCharacterName") || "Olaf";
    const selectedImage = localStorage.getItem("selectedCharacterImage") || "images/character/olaf.png";
    const selectedFriendship = getFriendshipLevel(selectedCharacter);

    detailCharacterName.textContent = selectedName;
    detailCharacterImage.src = selectedImage;
    detailCharacterImage.alt = selectedName;
    detailHearts.innerHTML = createHearts(selectedFriendship);
}


/* ========================= */
/* AR CAMERA */
/* ========================= */

const cameraVideo = document.getElementById("cameraVideo");
const backToCharactersButton = document.getElementById("backToCharactersButton");

if (backToCharactersButton) {
    backToCharactersButton.addEventListener("click", function () {
        window.location.href = "characters.html";
    });
}

if (cameraVideo) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        })
        .then(function (stream) {
            cameraVideo.srcObject = stream;
            cameraVideo.play();
        })
        .catch(function (error) {
            console.log("Camera kon niet geopend worden:", error);
        });
    } else {
        console.log("Camera wordt niet ondersteund door deze browser.");
    }
}


/* ========================= */
/* AR SCAN NAAR CHARACTER */
/* ========================= */

const environmentMessage = document.querySelector(".environment-message");

if (environmentMessage) {
    setTimeout(function () {
        window.location.href = "ar-character.html";
    }, 2000);
}


/* ========================= */
/* GESPREK MET OLAF + VRIENDSCHAP */
/* ========================= */

const speechBubble = document.getElementById("speechBubble");
const answerOptions = document.getElementById("answerOptions");
const arFriendshipHearts = document.getElementById("arFriendshipHearts");

const selectedCharacterKey = localStorage.getItem("selectedCharacter") || "olaf";

function renderArFriendshipHearts() {
    if (!arFriendshipHearts) {
        return;
    }

    const level = getFriendshipLevel(selectedCharacterKey);
    arFriendshipHearts.innerHTML = createHearts(level);
}

function increaseFriendship() {
    const currentLevel = getFriendshipLevel(selectedCharacterKey);
    let talkCount = Number(localStorage.getItem(`talkCount_${selectedCharacterKey}`)) || 0;

    talkCount++;
    localStorage.setItem(`talkCount_${selectedCharacterKey}`, talkCount);

    /*
        Elke 3 antwoorden = 1 hartje erbij.
        Maximaal 5 hartjes.
    */
    if (talkCount % 3 === 0 && currentLevel < 5) {
        const newLevel = currentLevel + 1;

        saveFriendshipLevel(selectedCharacterKey, newLevel);
        renderArFriendshipHearts();

        return true;
    }

    return false;
}

const conversation = {
    start: {
        text: "Hoi! Ik ben Olaf! Hoe gaat het vandaag?",
        answers: [
            {
                text: "Gaat goed!",
                next: "goed"
            },
            {
                text: "Gaat wat minder",
                next: "minder"
            },
            {
                text: "Wie ben jij?",
                next: "wie"
            }
        ]
    },

    goed: {
        text: "Wat fijn om te horen! Daar word ik helemaal blij van. Zullen we samen iets leuks doen?",
        answers: [
            {
                text: "Ja, laten we op avontuur gaan!",
                next: "avontuur"
            },
            {
                text: "Ik wil gewoon even praten",
                next: "praten"
            }
        ]
    },

    minder: {
        text: "Oh nee, dat is niet fijn. Ik blijf wel even bij je. Soms helpt een warme knuffel!",
        answers: [
            {
                text: "Dankjewel Olaf",
                next: "dankje"
            },
            {
                text: "Kun je me opvrolijken?",
                next: "opvrolijken"
            }
        ]
    },

    wie: {
        text: "Ik ben Olaf! Ik hou van warme knuffels, sneeuw en nieuwe vrienden maken.",
        answers: [
            {
                text: "Leuk om je te ontmoeten!",
                next: "ontmoeten"
            },
            {
                text: "Wat kun je doen?",
                next: "kunnen"
            }
        ]
    },

    avontuur: {
        text: "Jaaa! Kijk om je heen, misschien vinden we samen iets magisch in deze omgeving.",
        answers: [
            {
                text: "Nog een keer praten",
                next: "start"
            }
        ]
    },

    praten: {
        text: "Natuurlijk! Ik luister graag. Soms is samen praten al genoeg.",
        answers: [
            {
                text: "Dat is lief",
                next: "dankje"
            },
            {
                text: "Terug naar begin",
                next: "start"
            }
        ]
    },

    dankje: {
        text: "Altijd! Daar zijn vrienden voor.",
        answers: [
            {
                text: "Terug naar begin",
                next: "start"
            }
        ]
    },

    opvrolijken: {
        text: "Oké! Wist je dat ik ooit een hele zomer wilde meemaken? Ik dacht dat dat super gezellig zou zijn!",
        answers: [
            {
                text: "Haha Olaf!",
                next: "lach"
            },
            {
                text: "Terug naar begin",
                next: "start"
            }
        ]
    },

    ontmoeten: {
        text: "Ik vind het ook heel leuk om jou te ontmoeten. Volgens mij worden wij goede vrienden!",
        answers: [
            {
                text: "Terug naar begin",
                next: "start"
            }
        ]
    },

    kunnen: {
        text: "Ik kan met je praten, reageren op keuzes en straks misschien zelfs met je meelopen in AR.",
        answers: [
            {
                text: "Cool!",
                next: "cool"
            },
            {
                text: "Terug naar begin",
                next: "start"
            }
        ]
    },

    lach: {
        text: "Zie je! Een beetje lachen helpt soms echt.",
        answers: [
            {
                text: "Terug naar begin",
                next: "start"
            }
        ]
    },

    cool: {
        text: "Ja toch! Dit wordt een magisch avontuur.",
        answers: [
            {
                text: "Terug naar begin",
                next: "start"
            }
        ]
    }
};

function showConversationStep(stepName, friendshipJustIncreased = false) {
    const step = conversation[stepName];

    if (!speechBubble || !answerOptions || !step) {
        return;
    }

    if (friendshipJustIncreased) {
        speechBubble.textContent = "Onze vriendschap is gegroeid! Er is een hartje bijgekomen!";
    } else {
        speechBubble.textContent = step.text;
    }

    answerOptions.innerHTML = "";

    step.answers.forEach(function (answer) {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.textContent = answer.text;

        button.addEventListener("click", function () {
            const friendshipIncreased = increaseFriendship();
            showConversationStep(answer.next, friendshipIncreased);
        });

        answerOptions.appendChild(button);
    });
}

if (speechBubble && answerOptions) {
    renderArFriendshipHearts();
    showConversationStep("start");
}