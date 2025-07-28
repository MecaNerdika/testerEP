<?php
// Set header untuk menerima data JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Ambil data POST dari JavaScript
$data = json_decode(file_get_contents("php://input"), true);

// Validasi data
if (!$data || !isset($data["id"]) || !isset($data["score"])) {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit;
}

// Tambahkan tanggal pengerjaan
$data["date"] = date("Y-m-d H:i:s");

// Lokasi file JSON
$file = "scores.json";

// Baca file lama
if (file_exists($file)) {
    $json = file_get_contents($file);
    $records = json_decode($json, true);
    if (!is_array($records)) $records = [];
} else {
    $records = [];
}

// Tambahkan data baru
$records[] = $data;

// Simpan ke file
file_put_contents($file, json_encode($records, JSON_PRETTY_PRINT));

// Kirim respons sukses
echo json_encode(["status" => "success"]);
?>
