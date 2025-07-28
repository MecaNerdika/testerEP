const leaderboard = document.getElementById("leaderboard");
const data = JSON.parse(localStorage.getItem("hasilUjian"));
if (data) {
  const item = document.createElement("li");
  item.textContent = `${data.id}: ${Object.values(data.score).reduce((a,b) => a + b.score, 0)} poin`;
  leaderboard.appendChild(item);
}
