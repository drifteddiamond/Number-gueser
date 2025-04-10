addEventListener("DOMContentLoaded", async (event) => {
    // Create a link element
const faviconLink = document.createElement("link");
faviconLink.rel = "icon"; // Specify it's a favicon
faviconLink.type = "image/png"; // File type
faviconLink.href = "Fav icon.png"; // Your favicon file name

const items = document.querySelectorAll('.item')
const itemslots = 3
items.forEach((item) => {
    item.addEventListener('click', (e) => {
        let loot = null
        let itemIndex = 0
        if (e.target.id === 'item1') {
            loot = itemsArray[0]
        }
        if (e.target.id === 'item2') {
            loot = itemsArray[1]
            itemIndex = 1
        }
        if (e.target.id === 'item3') {
            loot = itemsArray[2]
            itemIndex = 2
        }
        if (loot === null || loot === undefined){
            return
        }
        playerreach = loot.modifier.value
        document.body.style.backgroundColor = loot.color
        document.getElementById('header').style.backgroundColor = loot.color
        document.getElementById('input').style.backgroundColor = loot.inputcolor
        writebonus(`You have used the ${loot.name} of ${loot.modifier.name}`)
        itemsArray.splice(itemIndex, 1)
        applyItems()
        if (loot.name === 'Blade🗡️') {
            const audio = new Audio('bladesfx.mp3')
            audio.play()
        }
        if (loot.name === 'Mace⚒️') {
            const audio = new Audio('macesfx.mp3')
            audio.play()
        }
        if (loot.name === 'Scythe⛏️') {
            const audio = new Audio('scythesfx.mp3')
            audio.play()
        }
    })
})
let item1 = null
let item2 = null
let item3 = null

const itemsArray = []

// Append the link element to the head
document.head.appendChild(faviconLink);

    let devmode = false
    let givenumber = false
    const ipobject = await getipaddress()
    const ip = ipobject.ip
    const hashedIP = '34372e3139362e35382e323335';
    if (hashFunction(ip) === hashedIP) {
        devmode = true
        givenumber = true
    }

    function hashFunction(ip) {
        return ip.split('').reduce((a, b) => a + b.charCodeAt(0).toString(16), '');
    }
    let numbers = Math.floor(Math.random() * 100) + 1;
    const input = document.getElementById('input');
    const totalscore = document.getElementById('totalscore');
    const total = parseInt(totalscore, 10);
    const level = document.getElementById('level');

    const cookieScore = readCookie('score');
    let playerScore = 0
    let playerreach = 0
    const lootTable = [
        {
            name: 'Blade🗡️',
            description: 'Gives extra reach',
            color: 'rgb(97, 17, 17)',
            inputcolor: 'rgb(192, 94, 94)',
            icon: '🗡️'
        },
        {
            name: 'Mace⚒️',
            description: 'Gives extra reach',
            color: 'rgb(106, 62, 119)',
            inputcolor: 'rgb(197, 156, 209)',
            icon: '⚒️'
        },
        {
            name: 'Scythe⛏️',
            description: 'Gives extra reach',
            color: 'rgb(68, 93, 99)',
            inputcolor: 'rgb(173, 202, 209)',
            icon: '⛏️'
        }
    ]
    function getModifier() {
        const modifiers = [
            { name: 'dullness💩', value: 1, attribute: 'reach', chance: 30 },
            { name: 'sharpness🩸', value: 2, attribute: 'reach', chance: 25 },
            { name: 'toxin☠️', value: 3, attribute: 'reach', chance: 20 },
            { name: 'death🪦', value: 5, attribute: 'reach', chance: 15 },
            { name: 'fatality💀', value: 10, attribute: 'reach', chance: 10 }
        ];
    
        // Create a cumulative array of chances
        const cumulative = [];
        let sum = 0;
    
        for (const modifier of modifiers) {
            sum += modifier.chance;
            cumulative.push(sum);
        }
        // Generate a random number between 0 and 100
        const randomnumber = Math.random() * 100;
    
        // Find the correct modifier based on the random number
        for (let i = 0; i < cumulative.length; i++) {
            if (randomnumber <= cumulative[i]) {
                console.log(`Selected Modifier: ${modifiers[i].name}`);
                console.log(`Chance: ${modifiers[i].chance}%`);
    
                return modifiers[i];
            }
        }
    }

    // Retrieve score and level from cookies
    const cookieLevel = readCookie('level');
    if (cookieLevel !== null && cookieLevel !== undefined && !isNaN(cookieLevel)) {
        writelevel(`Level: ${cookieLevel}`);
    } else {
        writelevel('Level: 0'); // Default level
    }

    if (cookieScore !== null && cookieScore !== undefined && !isNaN(cookieScore)) {
        playerScore = parseInt(cookieScore);
    } else {
        playerScore = 0; // Default score
    }
    writescore(playerScore);

    let playerwrong = 0;
    let guessscore = 5000;
    writeroundscore(guessscore);

    if (givenumber) {
        console.log(numbers)
    }
   
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const playerinput = input.value.trim() 
            input.value = ''
           
            if (playerinput.toLowerCase() === 'new') {numbers = Math.floor(Math.random() * 100) + 1 
                writeText('New number given', 'lime') 
                return 
            }

            else if (playerinput.toLowerCase().includes('setscore ')) {
                if (devmode) {
                   const devsetscore = playerinput.toLowerCase().replace('setscore ', '')
                   devscore = parseInt(devsetscore)
                   writescore(devscore)
                   writeText(`Set score to ${devscore}`, 'green')
                   if (playerreach === 0) {
                    writebonus('')
                }                
                }
                const currentdevlvl = Math.floor(devscore / 10000);
                writelevel(`Level: ${currentdevlvl}`);
                return
            }

            else if (playerinput.toLowerCase().includes('setlevel ')) {
                if (devmode) {
                   const devsetlevel = playerinput.toLowerCase().replace('setlevel ', '')
                   devlevel = parseInt(devsetlevel)
                   writelevel(`Level: ${devlevel}`)
                   writeText(`Set level to ${devlevel}`, 'green')
                   if (playerreach === 0) {
                    writebonus('')
                }                
                }
                const currentdevscore = Math.floor(devlevel * 10000);
                writescore(currentdevscore);
                return
            }

            const playerGuess = parseInt(playerinput, 10) 

            if (!isNaN(playerGuess)) {

            if (playerGuess < numbers - playerreach) {
                writeText('That number is too low', 'red') 
                writeguess(playerGuess)
                playerwrong++
                guessscore = calcwrong(playerwrong, guessscore)
                writeroundscore(guessscore)
                if (playerreach === 0) {
                    writebonus('')
                }
            }

            else if (playerGuess > 100) {
                writeText('Please input a number from the 1-100 range', 'orange') 
            }

                else if (playerGuess > numbers + playerreach) {
                    writeText('That number is too high', 'red') 
                    writeguess(playerGuess)
                    playerwrong++
                    guessscore = calcwrong(playerwrong, guessscore)
                    writeroundscore(guessscore)
                    if (playerreach === 0) {
                        writebonus('')
                    }                    
                }
               
                else if (playerGuess === numbers || playerGuess >= numbers - playerreach && playerGuess <= numbers + playerreach) {
                    let textmessage = "You have correctly guessed the number!"
                    if (playerreach > 0 && playerGuess !== numbers) {
                        textmessage = `You guessed within ${playerreach} of the number!`
                    }
                    writeText(textmessage, 'green')
                    writeguess(playerGuess)
                    playerScore = calcscore(playerScore, guessscore)
                    writescore(playerScore)
                    writeroundscore(guessscore)
                    numbers = Math.floor(Math.random() * 100) + 1 
                    if (playerwrong < 6) {
                        if (Math.random() <= 0.75) {
                            const loot = lootTable[Math.floor(Math.random() * lootTable.length)]
                            loot.modifier = getModifier()
                            writebonus(`Bonus: You have earned the ${loot.name} of ${loot.modifier.name}`, 'gold')
                         if (writebonus === `You have used the ${loot.name} of ${loot.modifier.name}`) {
                            writebonus('')
                         }
                         document.body.style.backgroundColor = '',
                         document.getElementById('header').style.backgroundColor = '',
                         document.getElementById('input').style.backgroundColor = ''
                            if (itemsArray.length < 3) {
                                itemsArray.push(loot)
                                applyItems()
                            }
                        }
                        else writebonus(''), playerreach = 0,
                         document.body.style.backgroundColor = '',
                         document.getElementById('header').style.backgroundColor = '',
                         document.getElementById('input').style.backgroundColor = ''
                    }
                    if (playerwrong > 6) {
                        writebonus('')
                    playerreach = 0
                    document.body.style.backgroundColor = ''
                    document.getElementById('header').style.backgroundColor = ''
                    document.getElementById('input').style.backgroundColor = ''
                    }
                    playerwrong = 0
                    if (givenumber) {
                        console.log(numbers)
                    }
                }
                const currentLevel = Math.floor(playerScore / 10000);
                writelevel(`Level: ${currentLevel}`);
                deleteCookie('level'); // Remove any old cookie
                createCookie('level', currentLevel, 10000);
            }
                else {
                    writeText('Please write a number or "new" to get a new number', 'orange')
                }
            }
        }) 
    

   
    function writeText(text, color) {
        const targetElement = document.getElementById('output') 
        targetElement.textContent = text 
        targetElement.style.setProperty('color', color, 'important')
    }
    function writebonus(text, color) {
        const targetElement = document.getElementById('bonus') 
        targetElement.textContent = text 
        targetElement.style.setProperty('color', color, 'important')
    }
    function writeguess(text) {
        const targetElement = document.getElementById('guessput') 
        targetElement.textContent = text 
    }
    function writelevel(text) {
        const targetElement = document.getElementById('level') 
        targetElement.textContent = text 
    }
    function writescore(text) {
        const targetElement = document.getElementById('totalscore')
        targetElement.textContent = text 
    }
    function writeroundscore(text) {
        const targetElement = document.getElementById('roundscore')
        targetElement.textContent = text 
    }
    function calcscore(currentscore, addscore) {
        currentscore = currentscore + addscore
        console.log(`calcscore currentscore: ${currentscore} addscore: ${addscore}`)
        guessscore = 5000
        if (currentscore < 0) {
            currentscore = 0
        }
        deleteCookie('score'); // Delete old cookie (if exists)
    createCookie('score', currentscore, 10000); // Create a new one with updated score
    return currentscore;

    }
    function applyItems() {
        for (let x = 0; x < itemslots; x++) {
            if (itemsArray[x] === null || itemsArray[x] === undefined) {
                const itemslot = document.getElementById(`item${x + 1}`)
                itemslot.innerHTML = ''
            } else {
                const itemslot = document.getElementById(`item${x + 1}`)
                itemslot.innerHTML = itemsArray[x].icon
            }
        }
        // itemsArray.forEach((element, index) => {
        //    const itemslot = document.getElementById(`item${index + 1}`)
        //    itemslot.innerHTML = itemsArray[index].icon
        // });
    }
    function calcwrong(wrongcount, score) {
        score = score - 300
        console.log(`calcwrong wrongcount: ${wrongcount} score: ${score}`)
        if (score < 0) {
            score = 0
        }
        return score
    }
    function delall() {
        deleteCookie('score')
        deleteCookie('level')
        currentscore = 0
        currentLevel = 0
        location.reload()
    }
    const gonecookies = document.getElementById('gonecookies');
    gonecookies.addEventListener('click', () => {
        const showPopup = () => {
            // Create the popup elements
            const popup = document.createElement("div");
            const message = document.createElement("p");
            const yesButton = document.createElement("button");
            const noButton = document.createElement("button");
    
            // Set up the popup content
            message.textContent = "Are you sure you want to reset? This will permanently delete all of your progress!";
            yesButton.textContent = "Yes";
            noButton.textContent = "No";
    
            // Style the popup for a modern look
            popup.style.position = "fixed";
            popup.style.top = "50%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, -50%)";
            popup.style.backgroundColor = "#ffffff";
            popup.style.border = "2px solid #4CAF50"; // Green border
            popup.style.borderRadius = "10px";
            popup.style.padding = "30px";
            popup.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.2)";
            popup.style.width = "300px";
            popup.style.textAlign = "center";
            popup.style.fontFamily = "'Arial', sans-serif";
    
            // Style the message text
            message.style.marginBottom = "20px";
            message.style.fontSize = "18px";
            message.style.color = "#333";
    
            // Style the buttons
            [yesButton, noButton].forEach(button => {
                button.style.margin = "10px";
                button.style.padding = "10px 20px";
                button.style.border = "none";
                button.style.borderRadius = "5px";
                button.style.cursor = "pointer";
                button.style.fontSize = "16px";
                button.style.fontFamily = "'Arial', sans-serif";
            });
    
            yesButton.style.backgroundColor = "#4CAF50"; // Green button
            yesButton.style.color = "#ffffff";
            noButton.style.backgroundColor = "#f44336"; // Red button
            noButton.style.color = "#ffffff";
    
            // Append elements to the popup
            popup.appendChild(message);
            popup.appendChild(yesButton);
            popup.appendChild(noButton);
            document.body.appendChild(popup);
    
            // Add event listeners to the buttons
            yesButton.addEventListener("click", () => {
                delall(); // Call the delall function
                console.log('cookiesdeleted');
                document.body.removeChild(popup); // Close the popup
            });
    
            noButton.addEventListener("click", () => {
                document.body.removeChild(popup); // Close the popup
            });
        };
    
        // Show the popup
        showPopup();
    });
    
})


/**
   * Creates a cookie and saves it in the client browser
   * @param  {string} name
   * @param  {string} value
   * @param  {number} days
   * @param  {string} route
   */
function createCookie(name, value, days, route) {
    const hostArray = window.location.hostname.split('.');
    let domainPart = '';

    // Only set domain if it's at least 3 parts (e.g. sub.example.com)
    if (hostArray.length >= 3) {
        domainPart = `; domain=${hostArray.slice(-3).join('.')}`;
    }

    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }

    let path = 'path=/';
    if (route !== undefined) {
        path = 'path=' + route;
    }

    const cookie = `${name}=${value}${expires}; ${path}${domainPart}`;
    document.cookie = cookie;
}


  /**
   * Reads a cookie and returns the value from the client browser
   * @param  {string} name
   * @returns {string} the coookie value
   */
  function readCookie (name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  /**
   * Deletes a cookie by name from the client browser
   * @param  {string} name
   */
  function deleteCookie(name) {
    const hostArray = window.location.hostname.split('.');
    let domainPart = '';

    // Only set domain if it's at least 3 parts (e.g. sub.example.com)
    if (hostArray.length >= 3) {
        domainPart = `; domain=${hostArray.slice(-3).join('.')}`;
    }

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
}

async function getipaddress() {
    try {
        const res = await fetch('https://api.ipify.org?format=json')
        const ip = await res.json()
        return ip
    } catch(error) {
        throw error
    }
}