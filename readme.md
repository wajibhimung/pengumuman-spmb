# Aplikasi Pengumuman Kelulusan SPMB SMKN 1 Telagasari

![Logo SMKN 1 Telagasari](https://skl.smkn1telagasari.sch.id/logo.png)

Aplikasi web sederhana, responsif, dan mudah dikelola untuk menampilkan hasil kelulusan Seleksi Penerimaan Murid Baru (SPMB). Aplikasi ini dibangun menggunakan Google Sheets sebagai database, Google Apps Script sebagai backend, dan HTML/CSS/JavaScript untuk frontend.



---

## ✨ Fitur Utama

-   **Pencarian Real-time:** Siswa dapat mengecek status kelulusan secara instan hanya dengan memasukkan NISN.
-   **Manajemen Data Mudah:** Seluruh data siswa dikelola sepenuhnya melalui Google Sheets. Panitia tidak perlu menyentuh kode untuk memperbarui data.
-   **Fitur Lupa NISN:** Halaman bantuan interaktif memungkinkan siswa menemukan NISN mereka hanya dengan mengetikkan nama.
-   **Modal Modern:** Tampilan NISN menggunakan modal yang modern, lengkap dengan tombol "Salin NISN".
-   **Tombol Bantuan WhatsApp:** Tombol melayang (Floating Action Button) dan link bantuan untuk akses cepat ke kontak panitia via WhatsApp.
-   **Desain Responsif:** Tampilan optimal di berbagai perangkat, mulai dari desktop hingga smartphone.
-   **Backend Tanpa Server (Serverless):** Dibangun di atas platform Google yang andal dan gratis.

---

## ⚙️ Arsitektur & Teknologi

Aplikasi ini bekerja dengan alur yang sederhana namun efektif:

1.  **Google Sheets:** Bertindak sebagai database utama untuk menyimpan data siswa (NISN, Nama, Asal SMP, Jurusan, Keterangan).
2.  **Google Apps Script:** Berfungsi sebagai API (backend) yang di-deploy sebagai Web App. Script ini bertugas:
    -   Menerima permintaan dari frontend.
    -   Mencari data yang sesuai di Google Sheets.
    -   Mengirimkan kembali hasilnya dalam format JSON.
3.  **Frontend (HTML, CSS, JS):** Dua file HTML (`index.html` dan `lupa-nisn.html`) yang menjadi antarmuka pengguna. Halaman ini yang mengirim permintaan `fetch` ke URL Web App Apps Script dan menampilkan hasilnya secara dinamis.

---

## 🔧 Panduan Instalasi & Setup

Ikuti langkah-langkah berikut untuk men-deploy aplikasi ini dari awal.

### **Langkah 1: Siapkan Google Sheet**

1.  Buat Google Sheet baru di [sheets.google.com](https://sheets.google.com).
2.  Pada baris pertama, buat header kolom dengan urutan **wajib** sebagai berikut:
    | A | B | C | D | E | F |
    | :--- | :--- | :--- | :--- | :--- | :--- |
    | **No** | **NISN** | **Nama** | **Asal SMP** | **Jurusan** | **Keterangan** |
3.  Isi data siswa mulai dari baris kedua. Pastikan kolom `Keterangan` diisi dengan `LULUS` atau `TIDAK LULUS`.
4.  Salin **ID Spreadsheet** Anda. ID ini adalah bagian dari URL, contoh: `https://docs.google.com/spreadsheets/d/`**`1aBcDeFgHiJkLmNoPqRsTuVwXyZ_12345-abcdefg`**`/edit`.

### **Langkah 2: Konfigurasi Google Apps Script**

1.  Dari Google Sheet Anda, buka **Ekstensi** > **Apps Script**.
2.  Hapus kode contoh dan tempelkan seluruh isi file `Code.gs` dari repositori ini.
3.  Di dalam `Code.gs`, ganti `GANTI_DENGAN_ID_SPREADSHEET_ANDA` dengan ID Spreadsheet yang Anda salin pada langkah sebelumnya.
    ```javascript
    const SHEET_ID = "GANTI_DENGAN_ID_SPREADSHEET_ANDA";
    ```
4.  **Deploy Script:**
    -   Klik tombol **Deploy** > **New deployment**.
    -   Klik ikon **gerigi (⚙️)**, pilih **Web app**.
    -   Pada bagian **Configuration**, atur sebagai berikut:
        -   **Description**: `API Pengumuman SPMB`
        -   **Execute as**: `Me`
        -   **Who has access**: `Anyone` (Sangat Penting!)
    -   Klik **Deploy**. Izinkan akses jika diminta.
    -   Salin **Web app URL** yang muncul. Ini adalah URL API Anda.

### **Langkah 3: Konfigurasi Frontend (HTML)**

1.  Buka file `index.html` dan `lupa-nisn.html`.
2.  Cari baris berikut di kedua file tersebut:
    ```javascript
    const WEB_APP_URL = 'https://...';
    ```
3.  Ganti URL yang ada dengan **Web app URL** yang Anda dapatkan dari Langkah 2.

### **Langkah 4: Hosting File**

1.  Unggah kedua file HTML yang sudah dikonfigurasi (`index.html` dan `lupa-nisn.html`) ke layanan hosting pilihan Anda.
2.  Pastikan kedua file berada di direktori yang sama.
3.  Bagikan link ke `index.html` kepada para siswa. Selesai!

---

## 🚀 Pengelolaan Aplikasi (Untuk Panitia)

Setelah aplikasi berjalan, pengelolaan sangatlah mudah:

-   **Menambah/Mengubah Data Siswa:** Cukup buka file Google Sheet Anda dan edit datanya. Perubahan akan **langsung aktif** di website tanpa perlu melakukan deploy ulang.
-   **Mengubah Tampilan/Logika:** Jika Anda ingin mengubah tampilan (CSS) atau logika (JavaScript), edit file HTML yang relevan dan unggah ulang ke hosting Anda.
-   **Mengubah Logika Backend:** Jika Anda mengubah file `Code.gs`, Anda **wajib** melakukan deploy ulang (pilih **Manage deployments** > **Edit** > **New version**) agar perubahan aktif.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detailnya.