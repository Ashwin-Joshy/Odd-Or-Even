$(document).ready(function () {
    
   
    $('#number').attr('disabled', 'disabled');
    let batting = ''
    let userScore = 0
    let aiScore = 0
    let outCount = 0
    let status = 'start'
    $('#userscore').text("Score:" + userScore)
    $('#aiscore').text("Score:" + aiScore)
    $('#start').click(() => {
        userScore = 0
        aiScore = 0
        outCount = 0
        $('#number').attr('placeholder', 'Press a number between 1 and 6');
        $('#start').text('Restart');
        $('#img').attr(`src`, `./photos/0.png`)
        $('#imgai').attr(`src`, `./photos/0.png`)
        $('#userscore').text("Score:" + userScore)
        $('#aiscore').text("Score:" + aiScore)
        status = 'start'
        const max = 1
        const min = 0
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        if (random == 1) {
            $('#status').text('User batting')
            batting = 'user'
        }
        else {
            $('#status').text('AI batting')
            batting = 'ai'
        }
        $('#box').attr('style', 'display: block')
       
    })

    $(document).on('keypress', function (e) {
        console.log(e.which);
        console.log(typeof (e.which));
        if (e.which == 101 && status == 'out') {
            console.log('inside 1');
            if (outCount == 2) {
                if (userScore == aiScore){
                    $('#status').text('Draw')
                }
                else if (userScore > aiScore) {
                    $('#status').text('Game Over! User Wins')
                }
                else {
                    $('#status').text('Game Over! AI Wins')
                }

            }
            else {
                batting == 'user' ? batting = 'ai' : batting = 'user'
                $('#img').attr(`src`, `./photos/0.png`)
                $('#imgai').attr(`src`, `./photos/0.png`)
                $('#status').text(batting == 'ai' ? 'AI batting' : 'User batting')
                status = 'start'
            }
        } 
    });
    $(document).on('keypress',(e) => {
        console.log(e.key);
        if (status == 'start'&&(e.which == 49 || e.which == 50 || e.which == 51 || e.which == 52 || e.which == 53 || e.which == 54)) {
            let max = 6
            let min = 1
            let aiInput = Math.floor(Math.random() * (max - min + 1)) + min;
            let input = Number(e.key)
            $('#number').val("")

            if (input < 7 && input > 0 && status == 'start') {
                $('#img').attr(`src`, `./photos/${input}.png`)
                $('#imgai').attr(`src`, `./photos/${aiInput}.png`)
                $('#ainumber').val(aiInput)
                if (input == aiInput) {
                    outCount += 1;
                    status = 'out'
                    $('#status').text('OUT! Press E to continue')
                }
                else {
                    if (batting == 'user') {
                        if (userScore > aiScore && outCount == 1) {
                            outCount += 1;
                            status = 'out'
                            $('#status').text('Press E to continue')
                        }
                        else {
                            userScore += input
                            $('#img').attr(`src`, `./photos/${input}.png`)
                            $('#userscore').text("Score:" + userScore)
                        }
                    }
                    else {
                        if (aiScore > userScore && outCount == 1) {
                            outCount += 1;
                            status = 'out'
                            $('#status').text('Press E to continue')
                        }
                        else {
                            aiScore += aiInput
                            $('#imgai').attr(`src`, `./photos/${aiInput}.png`)
                            $('#aiscore').text("Score:" + aiScore)
                        }

                    }
                }
            }
            else {
                alert("Invalid Input, the range is between 1-6")
            }

        }
    })

})