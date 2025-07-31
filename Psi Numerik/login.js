
function login() {
  const name = document.getElementById('name').value.trim();
  const token = document.getElementById('token').value.trim();
  if (!name || !token) return alert('Isi nama dan token!');
  if (token != "EP1") return ContentService.createTextOutput("Invalid token")
  localStorage.setItem('quiz_user', JSON.stringify({ name, token }));
  window.location.href = 'quiz.html';
}
