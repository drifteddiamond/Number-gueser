addEventListener("DOMContentLoaded", (event) => {
    let numbers = Math.floor(Math.random() * 100) + 1;

    const input = document.getElementById('input');
    const totalscore = document.getElementById('totalscore');
    const total = parseInt(totalscore, 10);
    const level = document.getElementById('level');

    const cookieScore = readCookie('score');
    let playerScore = 0
    let playerreach = 0

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

    console.log(cookieScore);

    let playerwrong = 0;
    let guessscore = 5000;
    writeroundscore(guessscore);

   
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const playerinput = input.value.trim() 
            input.value = '' 
           
            if (playerinput === 'new') {numbers = Math.floor(Math.random() * 100) + 1 
                writeText('New number given', 'lime') 
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
                    if (playerwrong <= 10) {
                        if (Math.random() <= 0.5) {
                            writebonus('Bonus: You have gained +5 reach')
                            playerreach = 5
                            document.body.style.backgroundColor = 'cyan'
                            document.getElementById('header').style.backgroundColor = 'cyan'
                            document.getElementById('input').style.backgroundColor = 'lightcyan'
                        }
                        else writebonus(''), playerreach = 0,
                         document.body.style.backgroundColor = '',
                         document.getElementById('header').style.backgroundColor = '',
                         document.getElementById('input').style.backgroundColor = ''
                    }
                    if (playerwrong > 10) {
                        writebonus('')
                    playerreach = 0
                    document.body.style.backgroundColor = ''
                    document.getElementById('header').style.backgroundColor = ''
                    document.getElementById('input').style.backgroundColor = ''
                    }
                }
                const currentLevel = Math.floor(playerScore / 10000);
    writelevel(`Level: ${currentLevel}`);
    deleteCookie('level'); // Remove any old cookie
createCookie('level', currentLevel, 10000);

            }
                else {
                    writeText('Please write a number or new to get a new number', 'orange')
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