// Konfigurasi Nama Sheet
const DATA_SHEET_NAME = "Pengumuman";
const SETTINGS_SHEET_NAME = "Settings";

// Fungsi untuk mengambil semua pengaturan dari sheet 'Settings'
function getSettings(spreadsheet) {
  const settingsSheet = spreadsheet.getSheetByName(SETTINGS_SHEET_NAME);
  if (!settingsSheet) return {};
  const range = settingsSheet.getDataRange();
  const values = range.getValues();
  const settings = {};
  values.forEach(row => {
    if (row[0] && row[1] !== undefined) {
      const key = row[0].toString().toLowerCase().replace(/ /g, '_');
      settings[key] = row[1].toString();
    }
  });
  return settings;
}

// Fungsi utama yang menangani semua permintaan
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const settings = getSettings(spreadsheet);
    
    // 1. Cek status pengumuman (berlaku untuk semua aksi)
    if (settings.status_pengumuman.toUpperCase() !== 'BUKA') {
      return createJsonResponse({
        status: "closed",
        message: settings.pesan_saat_ditutup || "Pengumuman saat ini sedang ditutup.",
        settings: settings // Kirim settings agar halaman tetap bisa render header/footer
      });
    }

    const action = e.parameter.action;

    // 2. Rute untuk halaman 'Lupa NISN'
    if (action === 'getAllData') {
      const dataSheet = spreadsheet.getSheetByName(DATA_SHEET_NAME);
      const values = dataSheet.getDataRange().getValues();
      const allStudents = [];
      for (let i = 1; i < values.length; i++) {
        const row = values[i];
        allStudents.push({ nisn: row[1], nama: row[2], asal_smp: row[3] });
      }
      // ==========================================================
      // PERUBAHAN PENTING: Tambahkan 'settings' ke respons ini
      // ==========================================================
      return createJsonResponse({ status: "success", data: allStudents, settings: settings });
    }

    // 3. Rute untuk pencarian NISN (halaman utama)
    const nisn = e.parameter.nisn;
    if (!nisn) {
      // Request awal halaman index, hanya kirim settings
      return createJsonResponse({ status: "open", settings: settings });
    }

    const dataSheet = spreadsheet.getSheetByName(DATA_SHEET_NAME);
    const values = dataSheet.getDataRange().getValues();
    let studentData = null;
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[1].toString().trim() === nisn.trim()) {
        studentData = { nisn: row[1], nama: row[2], asal_smp: row[3], jurusan: row[4], keterangan: row[5] };
        break;
      }
    }

    if (studentData) {
      return createJsonResponse({ status: "success", data: studentData, settings: settings });
    } else {
      return createJsonResponse({ status: "not_found", message: "Data dengan NISN tersebut tidak ditemukan.", settings: settings });
    }

  } catch (error) {
    console.error("Terjadi error di Apps Script: " + error.toString());
    return createJsonResponse({ status: "error", message: "Terjadi kesalahan pada server." });
  }
}

// Fungsi utilitas untuk membuat respons JSON
function createJsonResponse(data) {
  const jsonOutput = JSON.stringify(data);
  return ContentService.createTextOutput(jsonOutput)
    .setMimeType(ContentService.MimeType.JSON);
}