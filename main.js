addEventListener("DOMContentLoaded", (event) => {
    let numbers = Math.floor(Math.random() * 100) + 1;

    const input = document.getElementById('input');
    const totalscore = document.getElementById('totalscore');
    const total = parseInt(totalscore, 10);
    const level = document.getElementById('level');

    const cookieScore = readCookie('score');
    let playerScore = 0;

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
                writeText('New number given') 
                return 
            }

            const playerGuess = parseInt(playerinput, 10) 

            if (!isNaN(playerGuess)) {

            if (playerGuess < numbers) {
                writeText('That number is too low') 
                writeguess(playerGuess)
                playerwrong++
                guessscore = calcwrong(playerwrong, guessscore)
                writeroundscore(guessscore)
            }

            else if (playerGuess > 100) {
                writeText('Please input a number from the 1-100 range') 
            }

                else if (playerGuess > numbers) {
                    writeText('That number is too high') 
                    writeguess(playerGuess)
                    playerwrong++
                    guessscore = calcwrong(playerwrong, guessscore)
                    writeroundscore(guessscore)
                }
               
                else if (playerGuess === numbers) {
                    writeText("You have correctly guessed the number!")
                    writeguess(playerGuess)
                    playerScore = calcscore(playerScore, guessscore)
                    writescore(playerScore)
                    writeroundscore(guessscore)
                    numbers = Math.floor(Math.random() * 100) + 1 
                }
                const currentLevel = Math.floor(playerScore / 10000);
    writelevel(`Level: ${currentLevel}`);
    deleteCookie('level'); // Remove any old cookie
createCookie('level', currentLevel);

            }
                else {
                    writeText('Please write a number or new to get a new number')
                }
            }
        }) 
    

   
    function writeText(text) {
        const targetElement = document.getElementById('output') 
        targetElement.textContent = text 
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
    createCookie('score', currentscore); // Create a new one with updated score
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
})


/**
   * Creates a cookie and saves it in the client browser
   * @param  {string} name
   * @param  {string} value
   * @param  {number} days
   * @param  {string} route
   */
function createCookie (name, value, days, route) {
    const hostArray = window.location.hostname.split('.')
    const domain = `${hostArray[hostArray.length - 3]}.${hostArray[hostArray.length - 2]}.${hostArray[hostArray.length - 1]}`
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toGMTString()
    } else {
      expires = ''
    }

    let path = 'path=/'
    if (route !== undefined) {
      path = 'path=' + route
    }

    const cookie = `${name}=${value}; ${expires}; path=${path}; domain=${domain}`
    document.cookie = cookie
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
  function deleteCookie (name) {
    const hostArray = window.location.hostname.split('.')
    const domainSuffix = `${hostArray[hostArray.length - 2]}.${hostArray[hostArray.length - 1]}`
    document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain=${domainSuffix}`
  }