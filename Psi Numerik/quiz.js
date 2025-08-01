
const questions = [
  { question: "\\(64 \\div 16 \\times 2 + 10 =\\)", answer: 18 },
  { question: "\\(864 \\div 4 \\times 10 - 5 =\\)", answer: 2155 },
  { question: "\\(56 \\times 37 - 2001 =\\)", answer: 71 },
  { question: "\\(\\sqrt{441} \\times 21 - 221 =\\)", answer: 20 },
  { question: "\\(729 \\div 27 + 21 =\\)", answer: 48 },
  { question: "\\(225 \\div 9 + \\sqrt{169}\\) =", answer: 38 },
  { question: "\\(\\sqrt{4^2 + 3^2} \\times 5 - 25 =\\)", answer: 0 },
  { question: "\\(8 \\times 8 \\times 8 + 7 - 7 - 7 =\\)", answer: 505 },
  { question: "\\(1005 \\div 5 + 50 - 101 =\\)", answer: 150 },
  { question: "\\(88 \\div 8 \\times 11 - 120 =\\)", answer: 1 },
  { question: "\\(11^2 + 12^2 + 13^2 =\\)", answer: 434 },
  { question: "\\(11^2 - 8^2 - 19 \\times 3 =\\)", answer: 0 },
  { question: "\\(2025^2 - 2024^2 - 2026 =\\)", answer: 2023 },
  { question: "\\(2025 \\times 2023 - 2024^2 + 3 =\\)", answer: 2 },
  { question: "\\(2016^2 - 2018 \\times 2014 =\\)", answer: 4 }
];

const form = document.getElementById('quizForm');
questions.forEach((q, i) => {
  form.innerHTML += `<div class='question'><b>${i + 1}.</b> ${q.question}<br>
    <input type='number' id='q${i}' /></div>`;
});
if (window.MathJax) {
  MathJax.typeset();
}

let countdown = 30*60;
const interval = setInterval(() => {
  countdown--;
  let minutes = Math.floor(countdown/60);
  const seconds = countdown%60;
  document.getElementById('countdown').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  if (countdown <= 0) {
    clearInterval(interval);
    submitQuiz();
  }
}, 1000);

function submitQuiz() {
  clearInterval(interval);
  const user = JSON.parse(localStorage.getItem('quiz_user')) || {};
  let score = 0;
  questions.forEach((q, i) => {
    const userAns = parseInt(document.getElementById(`q${i}`).value);
    if (userAns === q.answer) score++;
  });
  /* hapus block ini untuk lanjut ke halaman result
  const salah = questions.length-score;
  const persen = Math.round((score/questions.length)*100);
  document.getElementById('correct').textContent = score;
  document.getElementById('wrong').textContent = salah;
  document.getElementById('score_percent').textContent = persen;
  document.getElementById('remark').textContent = remark;
  document.getElementById('result').style.display = 'block';
  */
    // hapus block ini untuk lanjut ke halaman result
  // blok ini untuk mengirimkan ke spreadsheet
  const data = {
    name: user.name,
    token: user.token,
    score,
    time_spent: 300 - countdown
  };
  fetch('https://script.google.com/macros/s/AKfycbyzTlMi5Vu8telgA-ml5HLT-rf2wwjPTASCN1lJ_-Jlbn0lCw2QgEg6kBAvcfXb0yXY3w/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(() => {
    window.location.href = 'result.html?score=' + score;
  })
  .catch(error => {
  console.warn('gagal mengirim data ke spread sheet')
  //console.error('Gagal mengirim data:', error);
  // Tetap lanjut ke halaman hasil agar pengguna tidak bingung
  //window.location.href = 'result.html?score=' + score;
});;
}
