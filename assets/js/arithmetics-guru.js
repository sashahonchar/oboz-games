$(function () {
    $('.game__start').on('click', startGame);

    var taskTime = 5; //seconds
    var currentScore = 0;
    var currentResult;
    var currentPos = 0;
    var keyboard = $('.keyboard'),
        task = $('.task'),
        controls = $('.game__controls'),
        answer = $('#answer'),
        score = $('.score__value');

    var currentTimer;
    var answerPlaceholder;
    var answerLength;
    var gameMode;

    function startGame() {
        keyboard.show();
        task.show();
        controls.hide();
        $('.post-game').hide();
        $('.score').show();
        setGameMode();
        newTask();
        readAnswer();
    }

    function setGameMode() {
        gameMode = $('#game__mode option:selected').val();
    }

    function newTask() {
        var operand1,
            operand2,
            operator,
            n1 = Math.floor(Math.random() * 8) + 2,
            n2 = Math.floor(Math.random() * 8) + 2,
            answer;
        switch (gameMode) {
            case 'all':
                operator = Math.floor(Math.random() * 4);
                break;
            case 'addition':
                operator = 0;
                break;
            case 'subtraction':
                operator = 1;
                break;
            case 'multiplication':
                operator = 2;
                break;
            case 'division':
                operator = 3;
                break;
        }
        switch (operator) {
            case 0:
                operatorSign = '+';
                operand1 = n1;
                operand2 = n2;
                answer = operand1 + operand2;
                break;
            case 1:
                operatorSign = '-';
                operand1 = n1;
                operand2 = Math.floor(Math.random() * n1);
                answer = operand1 - operand2;
                break;
            case 2:
                operatorSign = '*';
                operand1 = n1;
                operand2 = n2;
                answer = operand1 * operand2;
                break;
            case 3:
                operatorSign = '/';
                operand2 = n1;
                answer = n2;
                operand1 = answer * operand2;
                break;
        }

        var i = answerLength = answer.toString().length;
        answerPlaceholder = '';
        while (i) {
            answerPlaceholder += '?';
            i--;
        }

        $('#operand1').text(operand1);
        $('#operand2').text(operand2);
        $('#operator').text(operatorSign);
        $('#answer').text(answerPlaceholder);
        startCountdown(taskTime);
        currentPos = 0;
        currentResult = answer;
    }

    function readAnswer() {
        $(document).on('keydown', keyClick);
        $('.key').on('click', checkAnswer);
    }

    function checkAnswer() {
        var newAnswer = '';
        if ($(this).text() != 'c') {
            if (currentPos < answerLength) {
                for (var i = 0; i < answerLength; i++) {
                    if (i < currentPos) {
                        newAnswer += answer.text()[i];
                    } else if (i == currentPos) {
                        newAnswer += $(this).text();
                    } else {
                        newAnswer += '?';
                    }
                }
                currentPos++;
                answer.text(newAnswer);
                if (currentPos == answerLength) {
                    // check answer if it is correct
                    newAnswer = parseInt(newAnswer);
                    if (newAnswer != currentResult) {
                        setTimeout(function () {
                            newAnswer = answerPlaceholder;
                            answer.text(newAnswer);
                            currentPos = 0;
                        }, 500);
                    } else {
                        updateScore();
                        $('.key').off('click', checkAnswer);
                        $(document).off('keydown', keyClick);
                        newTask();
                        readAnswer();
                    }
                }
            }
        } else {
            if (currentPos > 0) {
                for (var i = 0; i < answerLength; i++) {
                    if (i < currentPos - 1) {
                        newAnswer += answer.text()[i];
                    } else {
                        newAnswer += '?';
                    }
                }
                currentPos--;
                answer.text(newAnswer);
            }
        }
    }

    function keyClick(e) {
        var code = e.keyCode;
        if ([35, 49, 97].includes(code)) {
            $('#key-1').click();
        } else if ([40, 50, 98].includes(code)) {
            $('#key-2').click();
        } else if ([34, 51, 99].includes(code)) {
            $('#key-3').click();
        } else if ([37, 52, 100].includes(code)) {
            $('#key-4').click();
        } else if ([12, 53, 101].includes(code)) {
            $('#key-5').click();
        } else if ([39, 54, 102].includes(code)) {
            $('#key-6').click();
        } else if ([36, 55, 103].includes(code)) {
            $('#key-7').click();
        } else if ([38, 56, 104].includes(code)) {
            $('#key-8').click();
        } else if ([33, 57, 105].includes(code)) {
            $('#key-9').click();
        } else if ([45, 48, 96].includes(code)) {
            $('#key-0').click();
        } else if ([8, 46].includes(code)) {
            $('#key-c').click();
        }
    }

    function updateScore() {
        currentScore++;
        score.text(currentScore);
    }

    function gameOver() {
        $('.key').off('click', checkAnswer);
        $(document).off('keydown', keyClick);

        $('.score').hide();
        $('.final-score__value').text(currentScore);
        $('.post-game').show();
        keyboard.hide();
        task.hide();
        controls.show();
        currentScore = 0;
        score.text(0);
    }

    function startCountdown(time) {
        var countdown = $('.countdown');
        var countdownBar = $(".countdown-bar");
        var maxTime = time;
        var newBar = countdownBar.clone(true);
        countdownBar.before(newBar);
        $("." + countdownBar.attr("class") + ":last").remove();
        countdown.text(maxTime);
        if (currentTimer) {
            clearInterval(currentTimer);
        }
        currentTimer = setInterval(function () {
            maxTime--;
            countdown.text(maxTime);
            if (maxTime == 0) {
                clearInterval(currentTimer);
                gameOver();
            }
        }, 1000);
    }
});