// クイズデータの例
const quizData = [
  {
    question: "日本の首都はどこ？",
    choices: ["東京", "大阪", "京都", "福岡"],
    answer: 0
  },
  {
    question: "イギリスの首都はどこ？",
    choices: ["リバプール", "マンチェスター", "ロンドン", "グラスゴー"],
    answer: 2
  },
  {
    question: "フランスの首都はどこ？",
    choices: ["パリ", "ニース", "マルセイユ", "リヨン"],
    answer: 0
  }
];

// HTML要素を取得
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result');
const timerDisplay = document.getElementById('timer-seconds');

let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 10;       // 1問あたりの制限時間（秒）
let timerId = null;       // setIntervalのIDを格納
let timeRemaining = 0;    // カウントダウン用

function loadQuiz() {
  const currentQuiz = quizData[currentQuestionIndex];
  
  // クイズの問題表示用の要素を作成
  const card = document.createElement('div');
  card.classList.add('card', 'p-3', 'mb-3');
  
  // 問題文
  const questionElement = document.createElement('h2');
  questionElement.textContent = currentQuiz.question;
  questionElement.classList.add('mb-3');
  
  // 選択肢（ボタン）
  const choicesList = document.createElement('div');
  choicesList.classList.add('d-flex', 'flex-column', 'gap-2');
  
  currentQuiz.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.classList.add('btn', 'btn-outline-primary');
    
    // クリック時の処理
    button.addEventListener('click', () => {
      // 正解チェック
      if (index === currentQuiz.answer) {
        score++;
      }
      // 次の問題へ
      stopTimer();        // タイマーを停止
      currentQuestionIndex++;
      showNextQuestion();
    });
    
    choicesList.appendChild(button);
  });
  
  // カードに要素を追加
  card.appendChild(questionElement);
  card.appendChild(choicesList);
  
  // 前の問題を消去して新しい問題を表示
  quizContainer.innerHTML = "";
  quizContainer.appendChild(card);
  
  // タイマー開始
  startTimer();
}

// 次の問題を表示
function showNextQuestion() {
  if (currentQuestionIndex < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

// 結果表示
function showResult() {
  quizContainer.innerHTML = "";
  resultContainer.innerHTML = `
    <div class="alert alert-success" role="alert">
      結果発表！あなたの正解数は ${score} / ${quizData.length} です
    </div>
  `;
  // 最後にタイマー表示などを空にする
  timerDisplay.textContent = "--";
}

// タイマー開始
function startTimer() {
  timeRemaining = timeLimit;
  timerDisplay.textContent = timeRemaining;
  
  // setIntervalで1秒ごとにカウントダウン
  timerId = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
    
    if (timeRemaining <= 0) {
      // 時間切れ
      stopTimer();
      // 強制的に次の問題へ
      currentQuestionIndex++;
      showNextQuestion();
    }
  }, 1000);
}

// タイマー停止
function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

// 最初の問題を読み込み
loadQuiz();
