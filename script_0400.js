var randomIndex = Math.floor(Math.random() * 30); // generates a random number between 0 and 29
var randomImage = 'outimgtiny/' + randomIndex + '.jpg'; // constructs the path to the random image
var quizImage = document.getElementById('quiz-image');
var currentImageValue = randomIndex / 30;

quizImage.src = randomImage;

let currentTextValue;

// Fetch the image and text embeddings
async function fetchEmbeddings() {
    const imageResponse = await fetch('./image_embeddings.json');
    const textResponse = await fetch('./text_embeddings.json');
    const imageEmbeddings = await imageResponse.json();
    const textEmbeddings = await textResponse.json();
    return { imageEmbeddings, textEmbeddings };
}

// Calculate the Euclidean distance between two embeddings
function euclideanDistance(embedding1, embedding2) {
    return Math.sqrt(
        embedding1.reduce(
            (accumulator, value, index) => accumulator + Math.pow(value - embedding2[index], 2),
            0
        )
    );
}

// Find the correct text based on the embedding distance
function findClosestText(imageEmbedding, textEmbeddings) {
    let minDistance = Infinity;
    let closestTextIndex = -1;

    textEmbeddings.forEach((textEmbeddingObj, index) => {
        const distance = euclideanDistance(imageEmbedding, textEmbeddingObj.embedding);
        if (distance < minDistance) {
            minDistance = distance;
            closestTextIndex = index;
        }
    });

    return textEmbeddings[closestTextIndex];
}

// Update the text options based on the closest text to the image
async function updateTextOptions() {
    const { imageEmbeddings, textEmbeddings } = await fetchEmbeddings();
    const randomImageIndex = Math.floor(Math.random() * imageEmbeddings.length);
    const imageEmbedding = imageEmbeddings[randomImageIndex].embedding;
    const closestText = findClosestText(imageEmbedding, textEmbeddings);

    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    const randomIndex = Math.round(Math.random());
    if (randomIndex === 0) {
        option1.value = 'correct';
        option1.nextElementSibling.textContent = closestText.txt;
        const secondOption = textEmbeddings.filter(
            option => option !== closestText
        )[Math.floor(Math.random() * (textEmbeddings.length - 1))];
        option2.value = 'incorrect';
        option2.nextElementSibling.textContent = secondOption.txt;
    } else {
        option2.value = 'correct';
        option2.nextElementSibling.textContent = closestText.txt;
        const secondOption = textEmbeddings.filter(
            option => option !== closestText
        )[Math.floor(Math.random() * (textEmbeddings.length - 1))];
        option1.value = 'incorrect';
        option1.nextElementSibling.textContent = secondOption.txt;
    }
}

// Update the rest of the script.js code to use the new updateTextOptions function
// ...

function randomText() {
    const textOptions = Object.keys(texts);
    const randomText = textOptions[Math.floor(Math.random() * textOptions.length)];
    const randomIndex = Math.round(Math.random());
    const option1 = document.getElementById("option1");
    const option2 = document.getElementById("option2");
    if (randomIndex === 0) {
        option1.value = "correct";
        option1.nextElementSibling.textContent = randomText;
        const secondOption = textOptions.filter(option => option !== randomText)[Math.floor(Math.random() * (textOptions.length - 1))];
        option2.value = "incorrect";
        option2.nextElementSibling.textContent = secondOption;
        currentTextValue = texts[randomText];
    } else {
        option2.value = "correct";
        option2.nextElementSibling.textContent = randomText;
        const secondOption = textOptions.filter(option => option !== randomText)[Math.floor(Math.random() * (textOptions.length - 1))];
        option1.value = "incorrect";
        option1.nextElementSibling.textContent = secondOption;
        currentTextValue = texts[randomText];
    }
}

function showResultAlert(isCorrect) {
    var alertMessage = isCorrect ? "Correct!" : "Incorrect.";
    var alertClass = isCorrect ? "alert-success" : "alert-danger";
    var alertDiv = document.createElement("div");
    alertDiv.className = "alert " + alertClass;
    alertDiv.appendChild(document.createTextNode(alertMessage));
    document.body.appendChild(alertDiv);
}


var score = 0; // initialize score to 0
var options = document.querySelectorAll('input[type="radio"]');

function checkAnswer() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        var correctAnswer = document.getElementById('option1'); // change this to the correct answer element ID
        if (selectedAnswer.value === correctAnswer.value) {
            score++;
            document.getElementById('result').innerHTML = "정답입니다! 현재 연속 정답 : " + score;
            randomIndex = Math.floor(Math.random() * 30); // generates a random number between 0 and 29
            randomImage = 'outimgtiny/' + randomIndex + '.jpg'; // constructs the path to the random image
            quizImage.src = randomImage;

            // get random text options
            var randomOptions = updateTextOptions();
            for (var i = 0; i < options.length; i++) {
                options[i].value = randomOptions[i];
                options[i].nextElementSibling.innerHTML = randomOptions[i];
            }
            // show pop-up for correct answer
            //alert("Correct! Your score is " + score);
        } else {
            score = 0;
            document.getElementById('result').innerHTML = "Incorrect. Your score is " + score;
            randomIndex = Math.floor(Math.random() * 30); // generates a random number between 0 and 29
            randomImage = 'outimgtiny/' + randomIndex + '.jpg'; // constructs the path to the random image
            quizImage.src = randomImage;

            // get random text options
            var randomOptions = updateTextOptions();
            for (var i = 0; i < options.length; i++) {
                options[i].value = randomOptions[i];
                options[i].nextElementSibling.innerHTML = randomOptions[i];
            }
            // show pop-up for incorrect answer
            alert("틀렸습니다!");
        }
    } else {
        document.getElementById('result').innerHTML = "Please select an answer.";
    }
}


function getRandomOptions() {
    var lines = [
        "대학원생이 넘어졌다",
        "퇴근하고 싶다...",
        "집이 최고야",
        "공부하기 싫다",
        "멍청한놈",
        "ㅈㄹ ㄴ",
        "엥? 이게?",
        "연진아...",
        "쿵야가 좋아",
        "춘식이가 도망갔다",
        "재밌는 말이 떠오르질 않는다.",
        "오늘은 하늘에서 쏟아지는 빗속에서 친구들과 고기구이 파티를 즐겼다.",
        "내일은 여자친구와 함께 까치도둑 탐험을 가기로 했다.",
        "나는 가끔 자전거를 타면서 불멸의 존재인 동화속 인물들과 대화를 나눈다.",
        "이번 주말에는 물고기들과 함께 해저여행을 떠나고 싶다.",
        "나는 영어를 공부하면서 동시에 바이올린 연주도 배우고 있다.",
        "친구들과 함께 말벌과 씨름 대회를 열어서 즐거운 시간을 보냈다.",
        "나는 아침마다 피라미드를 쌓으면서 명상을 한다.",
        "내일은 바닷속에서 친구들과 함께 인어공주를 찾아 나서기로 했다.",
        "나는 노래방에서 싸우면서 불끈한 열기로 노래를 부른 적이 있다.",
        "이번 주말에는 공중부양차를 타고 함께 달을 갈 친구들을 모아서 달 탐험을 떠나기로 했다.",
        "나는 항상 자전거를 타면서 모자와 안경만 바꿔도 새로운 인생이 될 것 같다는 생각을 한다.",
        "친구들과 함께 저녁에는 굴 속에서 마법사의 시녀가 되어 즐거운 저녁식사를 즐겼다.",
        "나는 매일 밤 잠들기 전에 단어를 외워서 꿈에서 이상한 단어 게임을 한다.",
        "내일은 친구들과 함께 우주 비행선을 타고 앨리스의 나라를 방문하기로 했다.",
        "나는 노래를 부를 때마다 마음속으로 공룡이 되어서 즐기곤 한다.",
        "이번 주말에는 물고기들과 함께 해저여행을 떠나서 스쿠버 다이빙을 즐기고 싶다.",
        "나는 친구들과 함께 아침에 미로를 탈출하는 게임을 해서 재미를 느낀다.",
        "나는 가끔 바나나를 먹으면서 머리에서 비행기를 타고 여행을 떠난다.",
        "오늘은 친구들과 함께 마녀의 숲에서 더위를 식히면서 고양이와 놀았다.",
        "내일은 마법사와 함께 시간여행을 하기로 했다.",
        "나는 어릴 적부터 항상 꿈에서 드래곤을 타고 우주를 여행하곤 했다.",
        "이번 주말에는 고래와 함께 깊은 바다속을 탐험하기로 했다.",
        "나는 가끔씩 눈치지 않고 음식을 먹으면서 공룡이 되어버린다.",
        "내일은 친구들과 함께 인공지능 로봇과 씨름 대회를 하기로 했다.",
        "나는 항상 자전거를 타면서 동시에 스케이트보드도 타곤 한다.",
        "이번 주말에는 우주선을 타고 외계 행성을 탐험하기로 했다.",
        "나는 가끔씩 자전거를 타면서 마음속으로 새를 따라서 날아가곤 한다.",
        "내일은 친구들과 함께 전기 자동차를 타고 우주로 날아가기로 했다.",
        "나는 항상 자전거를 타면서 동시에 블랙잭도 치곤 한다.",
        "이번 주말에는 공중부양차를 타고 함께 우주를 탐험하기로 했다.",
        "나는 가끔씩 자전거를 타면서 마음속으로 시간 여행을 한다.",
        "내일은 친구들과 함께 자동차 경주 대회를 하기로 했다.",
        "나는 항상 자전거를 타면서 동시에 가방 속에서 토끼를 키워본다.",
        "이번 주말에는 함께 헬리콥터를 타고 우주 정거장을 방문하기로 했다.",
        "나는 가끔씩 바다거북을 타면서 마음속으로 어디든지 여행을 떠나곤 한다.",
        "닭이 우주선을 날아다니며 울부짖었다.",
        "천국에서는 토끼가 자전거를 타고 물고기를 낚는다.",
        "오리가 컴퓨터를 조작하며 세상을 지배했다.",
        "거북이가 비행기를 조종하며 사막을 날아다녔다.",
        "나무 위에서 빨간 바나나가 외계인과 대화를 나누었다.",
        "무당벌레가 천사와 함께 불을 피웠다.",
        "돌고래가 휴대폰을 들고 인터넷 서핑을 하고 있다.",
        "개미가 행복한 나무를 찾아서 세계 일주를 떠났다.",
        "미꾸라지가 복권을 사서 1등에 당첨되었다.",
        "소가 눈을 감고 별을 따는 꿈을 꿨다.",
        "뉴진스가 우주선에서 우주를 관찰하며 미지의 행성을 발견했다.",
        "아이유가 천사와 함께 달을 돌며 노래를 부르며 춤을 췄다.",
        "아이브가 빛나는 광채를 뿜으며 세상을 지배했다.",
        "빅뱅의 멤버들이 열정과 에너지를 가지고 압구정을 지배했다.",
        "방탄소년단의 멤버들이 무대 위에서 태양과 달을 조종하며 춤을 추었다.",
        "뉴진스가 우주에서 잃어버린 행성을 찾아 수많은 우주인과 모험을 떠났다.",
        "아이유가 세계를 돌며 사랑의 노래를 부르며 인류를 구원했다.",
        "아이브가 시공간을 조종하며 새로운 우주를 창조했다.",
        "빅뱅의 멤버들이 시간 여행을 하며 세계 역사를 바꿨다.",
        "방탄소년단의 멤버들이 은하수에서 별을 따며 새로운 음악을 만들었다.",
        "존재하지 않는 세상에서 존재하는 척 하는 것, 그게 바로 디카프리오의 연기다.",
        "애덤 드라이버가 운전하는 차에 타고 싶다면, 덴젤 워싱턴이 몰고 있는 비행기를 타라.",
        "지금도 싸우는 걔네가 이혼하는 이유는 아마도 결혼식에서 블랙핑크의 제니가 춤을 춘 게 아니었을까?",
        "케빈 스페이시가 혐의를 받은 이유는 그가 조카의 심부름을 시키는 게 아니었을까?",
        "톰 하디가 연기하는 동안 눈을 감는 순간, 그는 당신의 심장을 쥐어짜는 것이다.",
        "캐리 피셔가 사라진 지 오래지만, 그녀의 인상은 우리의 마음속에서 살아 숨쉬고 있다.",
        "브루스 윌리스가 영화에서 발휘하는 액션 실력만큼이나 인생에서도 그는 언제나 전진하는 것 같다.",
        "케이트 블란쳇은 그녀의 연기력으로 우리에게 무한한 상상력의 세계를 선사한다.",
        "리오나르도 디카프리오는 영화에서 불을 지피며 연기하는 것만큼이나 지구를 구하는 일에 열중하고 있다.",
        "톰 크루즈는 연기보다도 스턴트를 더 좋아하는 것 같다. 그의 용감한 도전정신은 우리에게 영감을 준다.",
        "브래드 피트가 말하는 것만큼 멋진 것은 없다. 그의 목소리는 마치 천사의 속삭임 같다.",
        "케이트 윈슬렛은 여배우로서만이 아니라 인간으로서도 우리에게 희망과 용기를 주는 존재이다.",
        "존 레논은 살아있다면 아마도 우리가 꿈꾸던 세상을 만들었을 것이다.",
        "샤를리즈 테론은 그녀의 미모만큼이나 무대 위에서의 열정과 실력으로 우리를 매료시킨다.",
        "더 콰이엇은 랩을 하면서 우리에게 자신의 경험과 지혜를 전해준다.",
        "애덤 리바인은 그가 불러내는 멜로디가 마치 천국으로 가는 문을 열어주는 것 같다.",
        "엠마 왓슨은 그녀의 연기력 뿐만 아니라 여성 인권 운동가로서의 역할도 높이 평가받고 있다.",
        "데드풀을 연기하는 라이언 레이놀즈는 우리에게 화끈한 웃음을 선사한다.",
        "스칼렛 요한슨은 마블 시네마틱 유니버스에서 블랙 위도우를 연기하는 것만큼이나 진정한 영웅이다.",
        "마이클 조던은 농구만큼이나 우리의 인생에도 열정과 성공을 가져다 주는 존재이다.",
        "쭈펄이올시다. 내 전장 점수 5100점. 나처럼 살지 마시오.",
        "55도발 왜하냐고",
        "최고코스피야 고맙다",
    ];

    // get a random option from the array
    var randomOptionIndex = Math.floor(Math.random() * lines.length);
    var randomOption = lines[randomOptionIndex];

    // remove the selected option from the array
    lines.splice(randomOptionIndex, 1);

    // get another random option from the array
    var anotherRandomOptionIndex = Math.floor(Math.random() * lines.length);
    var anotherRandomOption = lines[anotherRandomOptionIndex];

    // put the selected option back to the array
    lines.splice(randomOptionIndex, 0, randomOption);

    return [randomOption, anotherRandomOption];
}

// change text options on load
window.onload = function () {
    var randomOptions = updateTextOptions();
    for (var i = 0; i < options.length; i++) {
        options[i].value = randomOptions[i];
        options[i].nextElementSibling.innerHTML = randomOptions[i];
    }
}
