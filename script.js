var randomIndex = Math.floor(Math.random() * 195); // generates a random number between 0 and 
var randomIndexPadded = String(randomIndex).padStart(3, '0'); // pads the randomIndex with zeros to ensure it has 3 digits
var randomImage = 'outimgs/' + randomIndexPadded + '.jpg'; // constructs the path to the random image
var quizImage = document.getElementById('quiz-image');

//quizImage.src = randomImage;

let globalImageEmbeddings;
let globalTextEmbeddings;

var score = 0; // initialize score to 0
//var options = document.querySelectorAll('input[type="radio"]');
var option0 = document.getElementById('option1');
var option1 = document.getElementById('option2');

var currentImageEmbedding;
var currentTextEmbedding0;
var currentTextEmbedding1;

fetchEmbeddings();

var lines = [
    "곰",
    "사과",
    "빨간색",
    "바다",
    "책",
    "노란 사진",
    "웃는 남자",
    "광활한 자연",
    "찬란한 별빛",
    "아침 식사",
    "매력적인 도시야경",
    "푸른 언덕과 들판",
    "물결이 일렁이는 조용한 호수",
    "차가운 눈빛을 뿜는 사람",
    "희미한 눈부신 빛줄기",
    "예의 바르고 세련된 사람",
    "불길한 번개와 천둥",
    "화려한 불꽃놀이",
    "소나기와 무더위를 날려버리는 청량한 비바람",
    "섬세한 감성의 소유자",
    "무뚝뚝한 행동으로 다가오는 사람",
    "붉은 노을에 물든 산 정상",
    "친절하고 배려심 깊은 인간",
    "찬란한 황금빛 태양이 비추는 들판",
    "푸른 하늘의 산봉우리",
    "상쾌한 바람과 파도",
    "구름에 가려진 일몰",
    "화창한 해변과 모래사장",
    "신비로운 달빛과 그림자",
    "냉철한 사고를 하는 사람",
    "감성적인 일몰",
    "붉은 단풍잎이 떨어지는 가을길",
    "카리브해의 투명한 파란 바다",
    "살구색 노을이 물든 바다 바깥 해안선",
    "노란 해가 지는 구름다리",
    "부드러운 핑크색 꽃잎의 향기",
    "차가운 눈과 얼음으로 뒤덮인 자연",
    "유쾌한 웃음이 인상적인 인물",
    "감성적인 보라색 꽃들의 화원",
    "신선한 아침 이슬",
    "쭈펄이올시다. 내 전장 점수 5100점. 나처럼 살지 마시오.",
    "55도발 왜하냐고",
    "틱톡 마스터",
    "4050 아이돌 팬",
    "최고 코스피야 고맙다",
    "슬픈 대학원생",
    "집에 가고 싶다...",
    "집이 최고야",
    "공부하기 싫다",
    "멍청한놈",
    "헛소리 하지마",
    "엥? 이게?",
    "쿵야가 좋아",
    "춘식이가 도망갔다",
    "재밌는 말이 떠오르질 않는 사람.",
    "어린 나이에 부자가 된 유튜버.",
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
    "나는 노래를 부를 때마다 마음속으로 공룡이 되어서 즐긴다.",
    "이번 주말에는 물고기들과 함께 해저여행을 떠나서 스쿠버 다이빙을 즐기고 싶다.",
    "나는 친구들과 함께 아침에 미로를 탈출하는 게임을 해서 재미를 느낀다.",
    "나는 가끔 바나나를 먹으면서 머리에서 비행기를 타고 여행을 떠난다.",
    "오늘은 친구들과 함께 마녀의 숲에서 더위를 식히면서 고양이와 놀았다.",
    "내일은 마법사와 함께 시간여행을 하기로 했다.",
    "나는 어릴 적부터 항상 꿈에서 드래곤을 타고 우주를 여행했다.",
    "이번 주말에는 고래와 함께 깊은 바다속을 탐험하기로 했다.",
    "나는 가끔씩 눈치지 않고 음식을 먹으면서 공룡이 되어버린다.",
    "내일은 친구들과 함께 인공지능 로봇과 씨름 대회를 하기로 했다.",
    "나는 항상 자전거를 타면서 동시에 스케이트보드도 탄다.",
    "이번 주말에는 우주선을 타고 외계 행성을 탐험하기로 했다.",
    "나는 가끔씩 자전거를 타면서 마음속으로 새를 따라서 날아간다.",
    "내일은 친구들과 함께 전기 자동차를 타고 우주로 날아가기로 했다.",
    "나는 항상 자전거를 타면서 동시에 블랙잭도 친다.",
    "이번 주말에는 공중부양차를 타고 함께 우주를 탐험하기로 했다.",
    "나는 가끔씩 자전거를 타면서 마음속으로 시간 여행을 한다.",
    "내일은 친구들과 함께 자동차 경주 대회를 하기로 했다.",
    "나는 항상 자전거를 타면서 동시에 가방 속에서 토끼를 키워본다.",
    "이번 주말에는 함께 헬리콥터를 타고 우주 정거장을 방문하기로 했다.",
    "나는 가끔씩 바다거북을 타면서 마음속으로 어디든지 여행을 떠난다.",
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
    "존재하지 않는 세상에서 존재하는 척 하는 것, 그게 바로 디카프리오의 연기다.",
    "애덤 드라이버가 운전하는 차에 타고 싶다면, 덴젤 워싱턴이 몰고 있는 비행기를 타라.",
    "지금도 싸우는 걔네가 이혼하는 이유는 아마도 결혼식에서 블랙핑크의 제니가 춤을 춘 게 아니었을까?",
    "케빈 스페이시가 혐의를 받은 이유는 그가 조카의 심부름을 시키는 게 아니었을까?",
    "더 콰이엇은 랩을 하면서 우리에게 자신의 경험과 지혜를 전해준다.",
    "애덤 리바인은 그가 불러내는 멜로디가 마치 천국으로 가는 문을 열어주는 것 같다.",
    "엠마 왓슨은 그녀의 연기력 뿐만 아니라 여성 인권 운동가로서의 역할도 높이 평가받고 있다.",
    "데드풀을 연기하는 라이언 레이놀즈는 우리에게 화끈한 웃음을 선사한다.",
    "스칼렛 요한슨은 마블 시네마틱 유니버스에서 블랙 위도우를 연기하는 것만큼이나 진정한 영웅이다.",
    "마이클 조던은 농구만큼이나 우리의 인생에도 열정과 성공을 가져다 주는 존재이다.",
];

function cosineSimilarity(embedding1, embedding2) {
    const dotProduct = embedding1.reduce((accumulator, value, index) => {
        return accumulator + value * embedding2[index];
    }, 0);

    const magnitude1 = Math.sqrt(embedding1.reduce((accumulator, value) => {
        return accumulator + Math.pow(value, 2);
    }, 0));

    const magnitude2 = Math.sqrt(embedding2.reduce((accumulator, value) => {
        return accumulator + Math.pow(value, 2);
    }, 0));

    return dotProduct / (magnitude1 * magnitude2);
}

function changeResultColor(color) {
    const colors = [color];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('result').style.color = randomColor;
}

function moveResultElement() {
    const resultElement = document.getElementById('result');
    resultElement.style.transition = 'transform 0.5s';
    resultElement.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        resultElement.style.transform = 'translateY(0px)';
    }, 500);
}

function updateResultText(text, color) {
    document.getElementById('result').textContent = text;
    changeResultColor(color);
    moveResultElement();
}

async function fetchEmbeddings() {
    const imageResponse = await fetch('./image_embeddings.json');
    const textResponse = await fetch('./text_embeddings.json');
    globalImageEmbeddings = await imageResponse.json();
    globalTextEmbeddings = await textResponse.json();
}

function getRandomIndexImg(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIndexforText(max) {
    let index;
    if (score < 10) {
        index = Math.floor(Math.random() * 61); // generates a random number between 0 and 50
    } else if (score < 20) {
        index = Math.floor(Math.random() * 81); // generates a random number between 0 and 90
    } else {
        index = Math.floor(Math.random() * (max - 10)) + 10; // generates a random number between 40 and max-1
    }
    return index;
}

async function loadNewQuiz() {
    randomIndex = getRandomIndexImg(195);
    randomIndexPadded = String(randomIndex).padStart(3, '0'); // pads the randomIndex with zeros to ensure it has 3 digits
    randomImage = `outimgs/${randomIndexPadded}.jpg?${new Date().getTime()}`; // added cache-busting query parameter
    await fetch(randomImage)
        .then((response) => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Image not found');
            }
        })
        .then((blob) => {
            quizImage.src = URL.createObjectURL(blob);
            updateTextOptions();
        })
        .catch((error) => {
            console.log('Error loading image:', error);
        });
}


async function updateTextOptions() {
    currentImageEmbedding = globalImageEmbeddings[randomIndex].e;

    var randomOptionIndex = getRandomIndexforText(lines.length);
    var anotherRandomOptionIndex = getRandomIndexforText(lines.length);

    var randomOption = lines[randomOptionIndex];
    var anotherRandomOption = lines[anotherRandomOptionIndex];

    currentTextEmbedding0 = globalTextEmbeddings[randomOptionIndex].e;
    currentTextEmbedding1 = globalTextEmbeddings[anotherRandomOptionIndex].e;

    var similarity0 = cosineSimilarity(currentImageEmbedding, currentTextEmbedding0);
    var similarity1 = cosineSimilarity(currentImageEmbedding, currentTextEmbedding1);
    var scorethreshold = 0;
    if (score < 10) {
        scorethreshold = 0.14;
    }
    else if (score < 20) {
        scorethreshold = 0.08;
    }
    console.debug(scorethreshold);
    var counting = 0;
    while (Math.abs(similarity0 - similarity1) < scorethreshold) {
        counting++;
        console.log(similarity0, similarity1);
        anotherRandomOptionIndex = getRandomIndexforText(lines.length);
        anotherRandomOption = lines[anotherRandomOptionIndex];
        currentTextEmbedding1 = globalTextEmbeddings[anotherRandomOptionIndex].e;
        similarity1 = cosineSimilarity(currentImageEmbedding, currentTextEmbedding1);
        if (counting > 10) {
            randomOptionIndex = getRandomIndexforText(lines.length);
            randomOption = lines[randomOptionIndex];
            currentTextEmbedding0 = globalTextEmbeddings[randomOptionIndex].e;
            similarity0 = cosineSimilarity(currentImageEmbedding, currentTextEmbedding0);
        }
    }
    if (randomOptionIndex == 51) { similarity0 - 0.05; }
    else if (anotherRandomOptionIndex == 51) { similarity0 - 0.05; }
    // Define option1 and option2 variables
    if (similarity0 > similarity1) {
        option0.value = 'correct';
        option0.labels[0].textContent = randomOption;
        option1.value = 'incorrect';
        option1.labels[0].textContent = anotherRandomOption;
    } else {
        option0.value = 'incorrect';
        option0.labels[0].textContent = randomOption;
        option1.value = 'correct';
        option1.labels[0].textContent = anotherRandomOption;
    }
}

function checkAnswer() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        if (selectedAnswer.value === 'correct') {
            score++;
            updateResultText(`정답입니다! 현재 연속 정답 : ${score}`, 'green');
            loadNewQuiz();
        } else {
            var similarity0 = cosineSimilarity(currentImageEmbedding, currentTextEmbedding0);
            var similarity1 = cosineSimilarity(currentImageEmbedding, currentTextEmbedding1);

            score = 0;
            updateResultText("틀렸습니다! 현재 연속 정답 : 0", 'red');
            loadNewQuiz();
            alert(`틀렸습니다!\n\n 1번 점수: ${((similarity0) * 50 + 50).toFixed(1)}\n 2번 점수: ${((similarity1) * 50 + 50).toFixed(1)}`);
        }
    } else {
        document.getElementById('result').textContent = "답을 선택하세요.";
    }
}

window.onload = async function () {
    await fetchEmbeddings(); // Wait for the embeddings to be loaded
    loadNewQuiz();
}
