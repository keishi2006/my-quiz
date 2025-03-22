// クイズデータの例
const quizData = [
  {
    question: "日本の首都はどこ？",
    choices: ["東京", "大阪", "京都", "福岡"],
    answer: 0 // 配列の0番目の選択肢（"東京"）が正解
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

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

function loadQuiz() {
  // 現在の問題を取得
  const currentQuiz = quizData[currentQuestionIndex];
  
  // 問題文の表示
  const questionElement = document.createElement('h2');
  questionElement.textContent = currentQuiz.question;
  
  // 選択肢のボタンを作成
  const choicesList = document.createElement('div');
  currentQuiz.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    
    // ボタンをクリックしたときの処理
    button.addEventListener('click', () => {
      // 正解チェック
      if (index === currentQuiz.answer) {
        score++;
      }
      // 次の問題へ
      currentQuestionIndex++;
      showNextQuestion();
    });
    
    choicesList.appendChild(button);
  });
  
  // コンテナに問題文と選択肢を追加
  quizContainer.innerHTML = ""; // 前の問題を消去
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(choicesList);
}

function showNextQuestion() {
  if (currentQuestionIndex < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.innerHTML = "";
  resultContainer.innerHTML = `<h2>結果発表！あなたの正解数は ${score} / ${quizData.length} です</h2>`;
}

// 最初の問題を読み込む
loadQuiz();
