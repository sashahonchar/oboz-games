$(function () {
    $('.game__start').on('click', startGame);

    var taskTime = 10; //seconds
    var currentScore = 0;
    var currentResult;
    var task = $('.task');
    var currentTimer;
    var randNumOld;
    var countries = [
        {
            "id": 1,
            "country": "Австралия",
            "capital": "Канберра"
        }, {
            "id": 2,
            "country": "Австрия",
            "capital": "Вена"
        }, {
            "id": 3,
            "country": "Азербайджан",
            "capital": "Баку"
        }, {
            "id": 4,
            "country": "Албания",
            "capital": "Тирана"
        }, {
            "id": 5,
            "country": "Алжир",
            "capital": "Алжир"
        }, {
            "id": 6,
            "country": "Ангола",
            "capital": "Луанда"
        }, {
            "id": 7,
            "country": "Андорра",
            "capital": "Андорра-ла-Велья"
        }, {
            "id": 8,
            "country": "Антигуа и Барбуда",
            "capital": "Сент-Джонс"
        }, {
            "id": 9,
            "country": "Аргентина",
            "capital": "Буэнос-Айрес"
        }, {
            "id": 10,
            "country": "Армения",
            "capital": "Ереван"
        }, {
            "id": 11,
            "country": "Афганистан",
            "capital": "Кабул"
        }, {
            "id": 12,
            "country": "Багамы",
            "capital": "Нассау"
        }, {
            "id": 13,
            "country": "Бангладеш",
            "capital": "Дакка"
        }, {
            "id": 14,
            "country": "Барбадос",
            "capital": "Бриджтаун"
        }, {
            "id": 15,
            "country": "Бахрейн",
            "capital": "Манама"
        }, {
            "id": 16,
            "country": "Беларусь",
            "capital": "Минск"
        }, {
            "id": 17,
            "country": "Белиз",
            "capital": "Бельмопан"
        }, {
            "id": 18,
            "country": "Бельгия",
            "capital": "Брюссель"
        }, {
            "id": 19,
            "country": "Бенин",
            "capital": "Порто-Ново"
        }, {
            "id": 20,
            "country": "Болгария",
            "capital": "София"
        }, {
            "id": 21,
            "country": "Боливия",
            "capital": "Сукре"
        }, {
            "id": 22,
            "country": "Босния и Герцеговина",
            "capital": "Сараево"
        }, {
            "id": 23,
            "country": "Ботсвана",
            "capital": "Габороне"
        }, {
            "id": 24,
            "country": "Бразилия",
            "capital": "Бразилиа"
        }, {
            "id": 25,
            "country": "Бруней",
            "capital": "Бандар-Сери-Багаван"
        }, {
            "id": 26,
            "country": "Буркина Фасо",
            "capital": "Уагадугу"
        }, {
            "id": 27,
            "country": "Бурунди",
            "capital": "Бужумбура"
        }, {
            "id": 28,
            "country": "Бутан",
            "capital": "Тхимпху"
        }, {
            "id": 29,
            "country": "Вануату",
            "capital": "Порт-Вила"
        }, {
            "id": 30,
            "country": "Ватикан",
            "capital": "Ватикан"
        }, {
            "id": 31,
            "country": "Великобритания",
            "capital": "Лондон"
        }, {
            "id": 32,
            "country": "Венгрия",
            "capital": "Будапешт"
        }, {
            "id": 33,
            "country": "Венесуэла",
            "capital": "Каракас"
        }, {
            "id": 34,
            "country": "Восточный Тимор",
            "capital": "Дили"
        }, {
            "id": 35,
            "country": "Вьетнам",
            "capital": "Ханой"
        }, {
            "id": 36,
            "country": "Габон",
            "capital": "Либревиль"
        }, {
            "id": 37,
            "country": "Гаити",
            "capital": "Порт-о-Пренс"
        }, {
            "id": 38,
            "country": "Гайана",
            "capital": "Джорджтаун"
        }, {
            "id": 39,
            "country": "Гамбия",
            "capital": "Банжул"
        }, {
            "id": 40,
            "country": "Гана",
            "capital": "Аккра"
        }, {
            "id": 41,
            "country": "Гватемала",
            "capital": "Гватемала"
        }, {
            "id": 42,
            "country": "Гвинея",
            "capital": "Конакри"
        }, {
            "id": 43,
            "country": "Гвинея-Бисау",
            "capital": "Бисау"
        }, {
            "id": 44,
            "country": "Германия",
            "capital": "Берлин"
        }, {
            "id": 45,
            "country": "Гондурас",
            "capital": "Тегусигальпа"
        }, {
            "id": 46,
            "country": "Гренада",
            "capital": "Сент-Джорджес"
        }, {
            "id": 47,
            "country": "Греция",
            "capital": "Афины"
        }, {
            "id": 48,
            "country": "Грузия",
            "capital": "Тбилиси"
        }, {
            "id": 49,
            "country": "Дания",
            "capital": "Копенгаген"
        }, {
            "id": 50,
            "country": "Джибути",
            "capital": "Джибути"
        }, {
            "id": 51,
            "country": "Доминика",
            "capital": "Розо"
        }, {
            "id": 52,
            "country": "Доминиканская Республика",
            "capital": "Санто-Доминго"
        }, {
            "id": 53,
            "country": "Египет",
            "capital": "Каир"
        }, {
            "id": 54,
            "country": "Замбия",
            "capital": "Лусака"
        }, {
            "id": 55,
            "country": "Зимбабве",
            "capital": "Хараре"
        }, {
            "id": 56,
            "country": "Израиль",
            "capital": "Иерусалим"
        }, {
            "id": 57,
            "country": "Индия",
            "capital": "Нью-Дели"
        }, {
            "id": 58,
            "country": "Индонезия",
            "capital": "Джакарта"
        }, {
            "id": 59,
            "country": "Иордания",
            "capital": "Амман"
        }, {
            "id": 60,
            "country": "Ирак",
            "capital": "Багдад"
        }, {
            "id": 61,
            "country": "Иран",
            "capital": "Тегеран"
        }, {
            "id": 62,
            "country": "Ирландия",
            "capital": "Дублин"
        }, {
            "id": 63,
            "country": "Исландия",
            "capital": "Рейкьявик"
        }, {
            "id": 64,
            "country": "Испания",
            "capital": "Мадрид"
        }, {
            "id": 65,
            "country": "Италия",
            "capital": "Рим"
        }, {
            "id": 66,
            "country": "Йемен",
            "capital": "Сана"
        }, {
            "id": 67,
            "country": "Кабо-Верде",
            "capital": "Прая"
        }, {
            "id": 68,
            "country": "Казахстан",
            "capital": "Астана"
        }, {
            "id": 69,
            "country": "Камбоджа",
            "capital": "Пномпень"
        }, {
            "id": 70,
            "country": "Камерун",
            "capital": "Яунде"
        }, {
            "id": 71,
            "country": "Канада",
            "capital": "Оттава"
        }, {
            "id": 72,
            "country": "Катар",
            "capital": "Доха"
        }, {
            "id": 73,
            "country": "Кения",
            "capital": "Найроби"
        }, {
            "id": 74,
            "country": "Кипр",
            "capital": "Никосия"
        }, {
            "id": 75,
            "country": "Киргизия",
            "capital": "Бишкек"
        }, {
            "id": 76,
            "country": "Кирибати",
            "capital": "Южная Тарава"
        }, {
            "id": 77,
            "country": "Китай",
            "capital": "Пекин"
        }, {
            "id": 78,
            "country": "Колумбия",
            "capital": "Санта-Фе-де-Богота"
        }, {
            "id": 79,
            "country": "Коморы",
            "capital": "Морони"
        }, {
            "id": 80,
            "country": "Конго, демократическая республика",
            "capital": "Киншаса"
        }, {
            "id": 81,
            "country": "Конго, республика ",
            "capital": "Браззавиль"
        }, {
            "id": 82,
            "country": "Коста-Рика",
            "capital": "Сан-Хосе"
        }, {
            "id": 83,
            "country": "Кот-д’Ивуар",
            "capital": "Ямусукро"
        }, {
            "id": 84,
            "country": "Куба",
            "capital": "Гавана"
        }, {
            "id": 85,
            "country": "Кувейт",
            "capital": "Эль-Кувейт"
        }, {
            "id": 86,
            "country": "Лаос",
            "capital": "Вьентьян"
        }, {
            "id": 87,
            "country": "Латвия",
            "capital": "Рига"
        }, {
            "id": 88,
            "country": "Лесото",
            "capital": "Масеру"
        }, {
            "id": 89,
            "country": "Либерия",
            "capital": "Монровия"
        }, {
            "id": 90,
            "country": "Ливан",
            "capital": "Бейрут"
        }, {
            "id": 91,
            "country": "Ливия",
            "capital": "Триполи"
        }, {
            "id": 92,
            "country": "Литва",
            "capital": "Вильнюс"
        }, {
            "id": 93,
            "country": "Лихтенштейн",
            "capital": "Вадуц"
        }, {
            "id": 94,
            "country": "Люксембург",
            "capital": "Люксембург"
        }, {
            "id": 95,
            "country": "Маврикий",
            "capital": "Порт-Луи"
        }, {
            "id": 96,
            "country": "Мавритания",
            "capital": "Нуакшот"
        }, {
            "id": 97,
            "country": "Мадагаскар",
            "capital": "Антананариву"
        }, {
            "id": 98,
            "country": "Македония",
            "capital": "Скопье"
        }, {
            "id": 99,
            "country": "Малави",
            "capital": "Лилонгве"
        }, {
            "id": 100,
            "country": "Малайзия",
            "capital": "Куала-Лумпур"
        }, {
            "id": 101,
            "country": "Мали",
            "capital": "Бамако"
        }, {
            "id": 102,
            "country": "Мальдивы",
            "capital": "Мале"
        }, {
            "id": 103,
            "country": "Мальта",
            "capital": "Валлетта"
        }, {
            "id": 104,
            "country": "Марокко",
            "capital": "Рабат"
        }, {
            "id": 105,
            "country": "Маршалловы Острова",
            "capital": "Маджуро"
        }, {
            "id": 106,
            "country": "Мексика",
            "capital": "Мехико"
        }, {
            "id": 107,
            "country": "Мозамбик",
            "capital": "Мапуту"
        }, {
            "id": 108,
            "country": "Молдавия",
            "capital": "Кишинев"
        }, {
            "id": 109,
            "country": "Монако",
            "capital": "Монако"
        }, {
            "id": 110,
            "country": "Монголия",
            "capital": "Улан-Батор"
        }, {
            "id": 111,
            "country": "Мьянма",
            "capital": "Найпьидо"
        }, {
            "id": 112,
            "country": "Намибия",
            "capital": "Виндхук"
        }, {
            "id": 113,
            "country": "Науру",
            "capital": "официальной столицы не имеет"
        }, {
            "id": 114,
            "country": "Непал",
            "capital": "Катманду"
        }, {
            "id": 115,
            "country": "Нигер",
            "capital": "Ниамей"
        }, {
            "id": 116,
            "country": "Нигерия",
            "capital": "Абуджа"
        }, {
            "id": 117,
            "country": "Нидерланды",
            "capital": "Амстердам"
        }, {
            "id": 118,
            "country": "Никарагуа",
            "capital": "Манагуа"
        }, {
            "id": 119,
            "country": "Новая Зеландия",
            "capital": "Веллингтон"
        }, {
            "id": 120,
            "country": "Норвегия",
            "capital": "Осло"
        }, {
            "id": 121,
            "country": "Объединенные Арабские Эмираты",
            "capital": "Абу-Даби"
        }, {
            "id": 122,
            "country": "Оман",
            "capital": "Маскат"
        }, {
            "id": 123,
            "country": "Пакистан",
            "capital": "Исламабад"
        }, {
            "id": 124,
            "country": "Палау",
            "capital": "Мелекеок"
        }, {
            "id": 125,
            "country": "Панама",
            "capital": "Панама"
        }, {
            "id": 126,
            "country": "Папуа - Новая Гвинея",
            "capital": "Порт-Морсби"
        }, {
            "id": 127,
            "country": "Парагвай",
            "capital": "Асунсьон"
        }, {
            "id": 128,
            "country": "Перу",
            "capital": "Лима"
        }, {
            "id": 129,
            "country": "Польша",
            "capital": "Варшава"
        }, {
            "id": 130,
            "country": "Португалия",
            "capital": "Лиссабон"
        }, {
            "id": 131,
            "country": "Россия",
            "capital": "Москва"
        }, {
            "id": 132,
            "country": "Руанда",
            "capital": "Кигали"
        }, {
            "id": 133,
            "country": "Румыния",
            "capital": "Бухарест"
        }, {
            "id": 134,
            "country": "Сальвадор",
            "capital": "Сан-Сальвадор"
        }, {
            "id": 135,
            "country": "Самоа",
            "capital": "Апиа"
        }, {
            "id": 136,
            "country": "Сан-Марино",
            "capital": "Сан-Марино"
        }, {
            "id": 137,
            "country": "Сан-Томе и Принсипи",
            "capital": "Сан-Томе"
        }, {
            "id": 138,
            "country": "Саудовская Аравия",
            "capital": "Эр-Рияд"
        }, {
            "id": 139,
            "country": "Свазиленд",
            "capital": "Мбабане"
        }, {
            "id": 140,
            "country": "Северная Корея",
            "capital": "Пхеньян"
        }, {
            "id": 141,
            "country": "Сейшелы",
            "capital": "Виктория"
        }, {
            "id": 142,
            "country": "Сенегал",
            "capital": "Дакар"
        }, {
            "id": 143,
            "country": "Сент-Винсент и Гренадины",
            "capital": "Кингстаун"
        }, {
            "id": 144,
            "country": "Сент-Китс и Невис",
            "capital": "Бастер"
        }, {
            "id": 145,
            "country": "Сент-Люсия",
            "capital": "Кастри"
        }, {
            "id": 146,
            "country": "Сербия",
            "capital": "Белград"
        }, {
            "id": 147,
            "country": "Сингапур",
            "capital": "Сингапур"
        }, {
            "id": 148,
            "country": "Сирия",
            "capital": "Дамаск"
        }, {
            "id": 149,
            "country": "Словакия",
            "capital": "Братислава"
        }, {
            "id": 150,
            "country": "Словения",
            "capital": "Любляна"
        }, {
            "id": 151,
            "country": "Соединенные Штаты Америки",
            "capital": "Вашингтон"
        }, {
            "id": 152,
            "country": "Соломоновы Острова",
            "capital": "Хониара"
        }, {
            "id": 153,
            "country": "Сомали",
            "capital": "Могадишо"
        }, {
            "id": 154,
            "country": "Судан",
            "capital": "Хартум"
        }, {
            "id": 155,
            "country": "Суринам",
            "capital": "Парамарибо"
        }, {
            "id": 156,
            "country": "Сьерра-Леоне",
            "capital": "Фритаун"
        }, {
            "id": 157,
            "country": "Таджикистан",
            "capital": "Душанбе"
        }, {
            "id": 158,
            "country": "Таиланд",
            "capital": "Бангкок"
        }, {
            "id": 159,
            "country": "Танзания",
            "capital": "Додома"
        }, {
            "id": 160,
            "country": "Того",
            "capital": "Ломе"
        }, {
            "id": 161,
            "country": "Тонга",
            "capital": "Нукуалофа"
        }, {
            "id": 162,
            "country": "Тринидад и Тобаго",
            "capital": "Порт-оф-Спейн"
        }, {
            "id": 163,
            "country": "Тувалу",
            "capital": "Фунафути"
        }, {
            "id": 164,
            "country": "Тунис",
            "capital": "Тунис"
        }, {
            "id": 165,
            "country": "Туркмения",
            "capital": "Ашхабад"
        }, {
            "id": 166,
            "country": "Турция",
            "capital": "Анкара"
        }, {
            "id": 167,
            "country": "Уганда",
            "capital": "Кампала"
        }, {
            "id": 168,
            "country": "Узбекистан",
            "capital": "Ташкент"
        }, {
            "id": 169,
            "country": "Украина",
            "capital": "Киев"
        }, {
            "id": 170,
            "country": "Уругвай",
            "capital": "Монтевидео"
        }, {
            "id": 171,
            "country": "Федеративные штаты Микронезии",
            "capital": "Паликир"
        }, {
            "id": 172,
            "country": "Фиджи",
            "capital": "Сува"
        }, {
            "id": 173,
            "country": "Филиппины",
            "capital": "Манила"
        }, {
            "id": 174,
            "country": "Финляндия",
            "capital": "Хельсинки"
        }, {
            "id": 175,
            "country": "Франция",
            "capital": "Париж"
        }, {
            "id": 176,
            "country": "Хорватия",
            "capital": "Загреб"
        }, {
            "id": 177,
            "country": "Центрально-Африканская Республика",
            "capital": "Банги"
        }, {
            "id": 178,
            "country": "Чад",
            "capital": "Нджамена"
        }, {
            "id": 179,
            "country": "Черногория",
            "capital": "Подгорица"
        }, {
            "id": 180,
            "country": "Чехия",
            "capital": "Прага"
        }, {
            "id": 181,
            "country": "Чили",
            "capital": "Сантьяго"
        }, {
            "id": 182,
            "country": "Швейцария",
            "capital": "Берн"
        }, {
            "id": 183,
            "country": "Швеция",
            "capital": "Стокгольм"
        }, {
            "id": 184,
            "country": "Шри-Ланка",
            "capital": "Коломбо"
        }, {
            "id": 185,
            "country": "Эквадор",
            "capital": "Кито"
        }, {
            "id": 186,
            "country": "Экваториальная Гвинея",
            "capital": "Малабо"
        }, {
            "id": 187,
            "country": "Эритрея",
            "capital": "Асмэра"
        }, {
            "id": 188,
            "country": "Эстония",
            "capital": "Таллин"
        }, {
            "id": 189,
            "country": "Эфиопия",
            "capital": "Аддис-Абеба"
        }, {
            "id": 190,
            "country": "Южная Корея",
            "capital": "Сеул"
        }, {
            "id": 191,
            "country": "Южно-Африканская Республика",
            "capital": "Претория"
        }, {
            "id": 192,
            "country": "Ямайка",
            "capital": "Кингстон"
        }, {
            "id": 193,
            "country": "Япония",
            "capital": "Токио"
        }];
    var controls = $('.game__controls');
    var answer = $('.answer');
    var score = $('.score__value');
    var currentCountry;
    var wrongAnswer = 0;
    var variantsEnabled = false;

    function startGame() {
        answer.show();
        task.show();
        controls.hide();
        $('.post-game').hide();
        $('.score').show();
        newTask();
        readAnswer();
    }

    function newTask() {
        var taskCountries = [];
        var order = [0,1,2,3];
        for (i = 0; i < 4; i++) {
            var randTask = getRandomInt(1, countries.length - 1);
            var answer = countries[randTask];
            taskCountries.push(answer);
            order.sort(compareRandom);
        }
        var question = $('#country').text(taskCountries[0].country);
        currentCountry = taskCountries[0];
        var answersVariants = $('.answer .variant');
        for(i = 0; i < 4; i++) {
            $(answersVariants[order[i]]).text(taskCountries[i].capital).attr('data-id',taskCountries[i].id);
        }
        wrongAnswer = 0;
        startCountdown(taskTime);
    }

    function readAnswer() {
        if (!variantsEnabled) {
            variantsEnabled = true;
            $('.variant').on('click', function(){
                var clickVariant = $(this).attr('data-id');
                if (clickVariant == currentCountry.id) {
                    newTask();
                    updateScore();
                } else {
                    checkAnswer()
                }
                console.log(wrongAnswer);
            });
        }
    }
    function checkAnswer() {
       if (wrongAnswer < 2) {
           wrongAnswer++;
       } else {
           clearInterval(currentTimer);
           gameOver();
       }
    }


    function updateScore() {
        currentScore++;
        score.text(currentScore);
    }

    function gameOver() {
        $('.btn').off('click', checkAnswer);
        $('.score').hide();
        $('.final-score__value').text(currentScore);
        $('.post-game').show();
        answer.hide();
        task.hide();
        controls.show();
        currentScore = 0;
        score.text(0);
    }

    function getRandomInt(min, max) {
        randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (randNum == randNumOld) getRandomInt(min, max);
        randNumOld = randNum;
        return randNum;
    }

    function compareRandom(a, b) {
        return Math.random() - 0.5;
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