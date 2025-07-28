function mulai() {
  const nama = document.getElementById("nama").value.trim();
  if (!nama) {
    alert("Silakan isi nama terlebih dahulu!");
    return;
  }
  localStorage.setItem("namaPeserta", nama);
  window.location.href = "ujian.html";
}
