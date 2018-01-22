$(function () {
    var taskTime = 150; //seconds
    var currentScore = 0;
    var currentResult;
    var currentPos = 0;
    var task = $('.task'),
        controls = $('.game__controls'),
        answer = $('#answer'),
        score = $('.score__value');

    var currentTimer;
    var answerPlaceholder;
    var answerLength;
    var gameDificulcy;

    $('.game__start').on('click', startGame);

    function startGame() {
        task.show();
        controls.hide();
        $('.post-game').hide();
        $('.score').show();
        setDificulcy();
        newPuzzle();
        readAnswer();
    }

    function setDificulcy() {
        gameDificulcy = parseInt($('#game__dificulcy option:selected').val());
        var taskClasses = task.attr('class').split(' ');
        $.each(taskClasses, function (i, item) {
            if (~item.indexOf('dificulcy')) {
                taskClasses[i] = 'dificulcy-' + gameDificulcy;
            }
        });
        taskClasses = taskClasses.join(' ');
        task.attr('class', taskClasses);
    }

    function newPuzzle() {
        var tasksCount = Math.pow(gameDificulcy, 2);
        var tasks = [];
        for (var i = 0; i < tasksCount; i++) {
            tasks.push(newTask());
        }
        console.log(tasks);
    }

    function newTask() {
        var operand1,
            operand2,
            answer,
            operator = Math.floor(Math.random() * 4),
            operatorSigns = ['+', '-', '*', '/'];

        switch (operator) {
            case 0:
                operand1 = Math.floor(Math.random() * 8) + 2;
                operand2 = Math.floor(Math.random() * 8) + 2;
                answer = operand1 + operand2;
                break;
            case 1:
                operand1 = Math.floor(Math.random() * 8) + 2;
                operand2 = Math.floor(Math.random() * operand1);
                answer = operand1 - operand2;
                break;
            case 2:
                operand1 = Math.floor(Math.random() * 8) + 2;
                operand2 = Math.floor(Math.random() * 8) + 2;
                answer = operand1 * operand2;
                break;
            case 3:
                operand2 = Math.floor(Math.random() * 8) + 2;
                answer = Math.floor(Math.random() * 8) + 2;
                operand1 = answer * operand2;
                break;
        }
        return {
            operand1: operand1,
            operand2: operand2,
            // operator: operator,
            operatorSign: operatorSigns[operator],
            answer: answer
        };
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