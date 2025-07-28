let soal1 = 0, soal2 = 0, sesi = 1, skor = {}, timer;
const waktuPerSesi = 10;// nanti ubah lagi jadi 2*60 (2 menit)
let detik = waktuPerSesi;

const info = document.getElementById("info");
const soalEl = document.getElementById("soal");
const input = document.getElementById("jawaban");
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

if (isMobile) {
  document.getElementById("inputArea").style.display = "none";
  const pad = document.getElementById("mobilePad");
  pad.style.display = "flex";
  for (let i = 0; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.className = "num";
    btn.innerText = i;
    btn.onclick = () => {
      input.value = i;
      submitJawaban();
    };
    pad.appendChild(btn);
  }
} else {
  input.focus();
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") submitJawaban();
  });
}

function tampilSoal() {
  soal1 = Math.floor(Math.random() * 10);
  soal2 = Math.floor(Math.random() * 10);
  soalEl.textContent = `${soal1} + ${soal2} = ?`;
  input.value = "";
  if (!isMobile) input.focus();
}

function submitJawaban() {
  const jwb = parseInt(input.value);
  const hasil = (soal1 + soal2) % 10;
  if (!skor["sesi_" + sesi]) skor["sesi_" + sesi] = { score: 0, salah: 0 };
  if (jwb === hasil) {
    skor["sesi_" + sesi].score += 1;
  } else {
    skor["sesi_" + sesi].salah += 1;
  }
  tampilSoal();
}

function updateWaktu() {
  if (detik <= 0) {
    sesi++;
    if (sesi > 3) return selesaiUjian();
    detik = waktuPerSesi;
  }
  const menit = Math.floor(detik / 60).toString().padStart(2, '0');
  const dtk = (detik % 60).toString().padStart(2, '0');
  info.innerHTML = `Sesi: ${sesi}/20 | Waktu: ${menit}:${dtk}`;
  detik--;
}

function selesaiUjian() {
  clearInterval(timer);
  const data = {
    id: localStorage.getItem("namaPeserta") || "anonim",
    date : new Date().toISOString(),
    score: skor
  };
  localStorage.setItem("hasilUjian", JSON.stringify(data));
  fetch("save.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data) // sebelumnya
  });
  window.location.href = "hasil.html";
  
}

tampilSoal();
timer = setInterval(() => {
  updateWaktu();
  if (sesi > 20) clearInterval(timer);
}, 1000);
