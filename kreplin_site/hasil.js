const hasil = localStorage.getItem("hasilUjian");
document.getElementById("output").textContent = hasil;
const mailto = "mailto:admin@example.com?subject=Hasil%20Ujian%20Kreplin&body=" + encodeURIComponent(hasil);
document.getElementById("mailtoLink").href = mailto;
