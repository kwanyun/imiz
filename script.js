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
    "대학원",
    "컴퓨터",
    "강아지",
    "음악",
    "사랑",
    "화장품",
    "눈이 내리다",
    "비행기",
    "과일",
    "옷",
    "마음",
    "꽃",
    "요리",
    "신발",
    "커피",
    "배",
    "손",
    "채소",
    "바람",
    "바이올린",
    "기분",
    "예쁜",
    "꿈",
    "물고기",
    "향수",
    "초콜릿",
    "공기",
    "인생",
    "숲",
    "점심",
    "초대",
    "우산",
    "공연",
    "손톱",
    "불꽃",
    "샴푸",
    "식물",
    "물건",
    "가을",
    "생각",
    "햇살",
    "햄버거",
    "헤어스타일",
    "스포츠",
    "거울",
    "시계",
    "기차",
    "아이스크림",
    "축구",
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
        index = Math.floor(Math.random() * 70); // generates a random number between 0 and 50
    }
    else {
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
        scorethreshold = 0.12;
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
