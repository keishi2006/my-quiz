// クイズデータの例（前回と同じ）
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

const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

function loadQuiz() {
  const currentQuiz = quizData[currentQuestionIndex];

  // Bootstrapの「card」を利用して問題を囲む
  const card = document.createElement('div');
  card.classList.add('card', 'p-3', 'mb-3'); 

  // 問題文
  const questionElement = document.createElement('h2');
  questionElement.textContent = currentQuiz.question;
  questionElement.classList.add('mb-3'); 

  // 選択肢のボタンを作成
  const choicesList = document.createElement('div');
  choicesList.classList.add('d-flex', 'flex-column', 'gap-2'); // 選択肢ボタン同士をスペースで区切る

  currentQuiz.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = choice;
    // Bootstrapのボタンスタイル
    button.classList.add('btn', 'btn-outline-primary');

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

  // カードに要素を追加
  card.appendChild(questionElement);
  card.appendChild(choicesList);

  // 前の問題を消去して新しい問題を表示
  quizContainer.innerHTML = "";
  quizContainer.appendChild(card);
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
  resultContainer.innerHTML = `
    <div class="alert alert-success" role="alert">
      結果発表！あなたの正解数は ${score} / ${quizData.length} です
    </div>
  `;
}

// 最初の問題をロード
loadQuiz();
