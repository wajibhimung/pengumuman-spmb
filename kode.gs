// GANTI DENGAN ID SPREADSHEET ANDA
const SHEET_ID = "106gaZsyrcdzVgQSMYjiA-otJwolzPv6x5KdV26bJjXg"; 
// GANTI DENGAN NAMA SHEET YANG BERISI DATA SISWA
const SHEET_NAME = "pengumuman";

function doGet(e) {
  const action = e.parameter.action;

  // Rute untuk mengambil semua data (untuk halaman Lupa NISN)
  if (action === 'getAllData') {
    return handleGetAllData();
  }
  
  // Rute default untuk mencari per NISN (untuk halaman utama)
  return handleSearchByNisn(e);
}

// Fungsi untuk menangani pencarian berdasarkan NISN
function handleSearchByNisn(e) {
  const nisn = e.parameter.nisn;

  if (!nisn) {
    return createJsonResponse({ status: "error", message: "Parameter NISN tidak ditemukan." });
  }

  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    let studentData = null;

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[1].toString().trim() === nisn.trim()) {
        studentData = {
          nisn: row[1],
          nama: row[2],
          asal_smp: row[3],
          jurusan: row[4],
          keterangan: row[5]
        };
        break;
      }
    }

    if (studentData) {
      return createJsonResponse({ status: "success", data: studentData });
    } else {
      return createJsonResponse({ status: "error", message: "Data dengan NISN tersebut tidak ditemukan." });
    }
  } catch (error) {
    console.error("Error in handleSearchByNisn: " + error.toString());
    return createJsonResponse({ status: "error", message: "Terjadi kesalahan pada server." });
  }
}

// Fungsi BARU untuk mengambil semua data siswa
function handleGetAllData() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const allStudents = [];

    // Loop mulai dari baris kedua (index 1)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      allStudents.push({
        nisn: row[1],
        nama: row[2],
        asal_smp: row[3]
      });
    }
    return createJsonResponse({ status: "success", data: allStudents });
  } catch (error) {
    console.error("Error in handleGetAllData: " + error.toString());
    return createJsonResponse({ status: "error", message: "Gagal mengambil data dari server." });
  }
}

// Fungsi utilitas untuk membuat respons JSON
function createJsonResponse(data) {
  const jsonOutput = JSON.stringify(data);
  return ContentService.createTextOutput(jsonOutput)
    .setMimeType(ContentService.MimeType.JSON);
}