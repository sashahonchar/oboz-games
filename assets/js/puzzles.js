$(function () {
    var taskTime = 3, //single task time
        newPuzzleTimeout = 3,
        imagesCount = 8;

    var puzzle = $('.puzzle'),
        task = $('.task'),
        controls = $('.game__controls'),
        answer = $('#answer'),
        score = $('.score__value');

    var currentTimer;
    var gameDificulcy;
    var tasks,
        currentTask,
        answersEnabled = false;

    $('.game__start').on('click', startGame);

    function startGame() {
        puzzle.show();
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
        var puzzleClasses = puzzle.attr('class').split(' ');
        $.each(puzzleClasses, function (i, item) {
            if (~item.indexOf('dificulcy')) {
                puzzleClasses[i] = 'dificulcy-' + gameDificulcy;
            }
        });
        puzzleClasses = puzzleClasses.join(' ');
        puzzle.attr('class', puzzleClasses);
    }

    function newPuzzle() {
        var imageId = Math.floor(Math.random() * (imagesCount - 1) + 1);
        var imageName = 'images/puzzles/image-' + imageId + '.jpg';
        puzzle.css('background-image', 'url("' + imageName + '")');
        var tasksCount = Math.pow(gameDificulcy, 2);
        var countdownTime = tasksCount * taskTime;
        tasks = [];
        var answers = $('.puzzle .answer');
        for (var i = 0; i < tasksCount; i++) {
            var task = newTask();
            tasks.push(task);
            $(answers[i]).text(task.answer).css('visibility', 'visible');
        }
        $('.countdown, .countdown-bar').show();
        nextTask();
        startCountdown(countdownTime);
    }

    function nextTask() {
        if (tasks.length > 0) {
            var taskId = Math.floor(Math.random() * (tasks.length - 1));
            currentTask = tasks[taskId];
            tasks.splice(taskId, 1);
            // console.log(taskId);
            $('#operand1').text(currentTask.operand1);
            $('#operand2').text(currentTask.operand2);
            $('#operator').text(currentTask.operatorSign);
        } else {
            congrats();
        }
    }

    function readAnswer() {
        if (!answersEnabled) {
            answersEnabled = true;
            $('.answer').on('click', function _answerClick() {
                var answer = $(this);
                console.log(answer.text());
                if (currentTask.answer == answer.text()) {
                    answer.css('visibility', 'hidden');
                    nextTask();
                } else {
                    answer.addClass('wrong');
                    setTimeout(function () {
                        answer.removeClass('wrong');
                    }, 500);
                }
            });
        }
    }

    function congrats() {
        if (currentTimer) {
            clearInterval(currentTimer);
        }
        $('.congrats').show();
        $('.countdown, .countdown-bar').hide();
        var timeoutTime = newPuzzleTimeout;
        var timeout = $('.next-puzzle-timeout');
        timeout.text(timeoutTime)
        var timer = setInterval(function () {
            timeoutTime--;
            timeout.text(timeoutTime);
            if (timeoutTime == 0) {
                clearInterval(timer);
                $('.congrats').hide();
                newPuzzle();
            }
        }, 1000);
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

    function gameOver() {
        task.hide();
        puzzle.hide();
        $('.post-game').show();
        controls.show();
    }

    function startCountdown(time) {
        var countdown = $('.countdown');
        var countdownBar = $(".countdown-bar");
        countdownBar.css('animation-duration', time + 's');
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