addEventListener("DOMContentLoaded", (event) => {
    let numbers = Math.floor(Math.random() * 100) + 1;

    const input = document.getElementById('input')
   
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const playerinput = input.value.trim();
            input.value = '';
           
            if (playerinput === 'new') {numbers = Math.floor(Math.random() * 100) + 1;
                writeText('New number given');
                return;
            }

            const playerGuess = parseInt(playerinput, 10);

            if (!isNaN(playerGuess)) {

            if (playerGuess < numbers) {
                writeText('That number is too low');
                writeguess(playerGuess)
            }

            else if (playerGuess > 100) {
                writeText('Please input a number from the 1-100 range');
            }

                else if (playerGuess > numbers) {
                    writeText('That number is too high');
                    writeguess(playerGuess)
                }
               
                else if (playerGuess === numbers) {
                    writeText("You have correctly guessed the number!")
                    writeguess(playerGuess)
                    numbers = Math.floor(Math.random() * 100) + 1;
                }
            }
                else {
                    writeText('Please write a number or new to get a new number')
                }
            }
        });
    

   
    function writeText(text) {
        const targetElement = document.getElementById('output');
        targetElement.textContent = text;
    }
    function writeguess(text) {
        const targetElement = document.getElementById('guessput');
        targetElement.textContent = text;
    }
});