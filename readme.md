# Aplikasi Pengumuman Kelulusan SPMB/PPDB Online



Aplikasi web modern, responsif, dan dinamis untuk menampilkan pengumuman hasil seleksi siswa baru. Dibangun menggunakan Google Sheets sebagai database, Google Apps Script sebagai backend, dan HTML/CSS/JavaScript murni untuk frontend.

Aplikasi ini dirancang agar sangat mudah dikelola oleh panitia non-teknis melalui Google Sheets, tanpa perlu menyentuh kode sama sekali setelah setup awal.

---

## Fitur Utama

*   **Backend Tanpa Server:** Sepenuhnya berjalan di atas infrastruktur Google (Sheets & Apps Script).
*   **Pengelolaan Dinamis:**
    *   **Kontrol Penuh dari Google Sheets:** Nama sekolah, tahun ajaran, URL logo, dan kontak bantuan dapat diubah langsung dari sheet `Settings`.
    *   **Buka/Tutup Pengumuman:** Mengaktifkan atau menonaktifkan pengumuman hanya dengan mengubah satu sel di sheet `Settings`.
*   **Antarmuka Modern & Responsif:**
    *   Tampilan bersih dan profesional yang otomatis menyesuaikan diri di perangkat desktop maupun mobile.
    *   Animasi preloader halaman untuk pengalaman memuat yang mulus.
*   **Fitur Ramah Pengguna:**
    *   **Halaman Lupa NISN:** Siswa dapat mencari NISN mereka hanya dengan mengetikkan sebagian nama.
    *   **Modal Modern:** Hasil pencarian NISN ditampilkan dalam modal yang elegan, bukan `alert()` kuno.
    *   **Tombol Salin & Bantuan:** Tombol untuk menyalin NISN dan tombol bantuan via WhatsApp terintegrasi.

---

## Teknologi yang Digunakan

*   **Backend:** Google Apps Script
*   **Database:** Google Sheets
*   **Frontend:** HTML5, CSS3, JavaScript (ES6+)

---

## Panduan Instalasi dan Konfigurasi

Ikuti langkah-langkah ini untuk menjalankan aplikasi Anda sendiri.

### Langkah 1: Persiapan Google Sheets

Ini adalah "Panel Kontrol" utama dari aplikasi Anda.

1.  **Buat Spreadsheet Baru:** Buka [sheets.google.com](https://sheets.google.com) dan buat spreadsheet baru. Beri nama, misalnya, `Database SPMB 2025`.

2.  **Buat Sheet `Data Siswa`:**
    *   Biarkan sheet pertama bernama `Sheet1` (atau ganti namanya sesuai keinginan, tapi pastikan nama ini sesuai dengan variabel `DATA_SHEET_NAME` di dalam kode `Code.gs`).
    *   Buat kolom dengan header yang **tepat** seperti di bawah ini di baris pertama:
        | A | B | C | D | E | F |
        |---|---|---|---|---|---|
        | **No** | **NISN** | **Nama** | **Asal SMP** | **Jurusan** | **Keterangan** |
    *   Isi data siswa mulai dari baris kedua. Pada kolom `Keterangan`, isi dengan `LULUS` atau `TIDAK LULUS`.

3.  **Buat Sheet `Settings`:**
    *   Klik ikon `+` untuk membuat sheet baru. Ganti namanya menjadi `Settings`.
    *   Buat struktur *key-value* berikut di kolom A dan B:

        | A (Setting) | B (Value) |
        |---|---|
        | Nama Sekolah | SMKN 1 TELAGASARI |
        | Tahun Ajaran | 2025/2026 |
        | URL Logo | https://skl.smkn1telagasari.sch.id/logo.png |
        | Nomor WhatsApp Bantuan | 6285167436497 |
        | Pesan WhatsApp | Kak, aku butuh bantuan! |
        | Status Pengumuman | BUKA |
        | Pesan Saat Ditutup | Pengumuman akan dibuka pada tanggal dan waktu yang telah ditentukan. |
        | Copyright Year | 2025 |

    > **PENTING:** Untuk `Status Pengumuman`, ketik `BUKA` untuk mengaktifkan aplikasi. Ketik nilai lain (misal: `TUTUP`) untuk menonaktifkannya dan menampilkan "Pesan Saat Ditutup".

### Langkah 2: Setup Google Apps Script

Ini adalah "mesin" yang menghubungkan data Anda ke website.

1.  **Buka Editor Script:** Dari spreadsheet Anda, klik menu **Ekstensi** > **Apps Script**.
2.  **Salin Kode:** Hapus semua kode contoh di file `Code.gs` dan salin-tempel seluruh isi file `Code.gs` dari proyek ini.
3.  **Deploy sebagai Web App:**
    *   Klik tombol **Deploy** di pojok kanan atas, lalu pilih **New deployment**.
    *   Klik ikon **gerigi** di sebelah "Select type", lalu pilih **Web app**.
    *   Isi konfigurasi sebagai berikut:
        *   **Description:** `API Pengumuman SPMB`
        *   **Execute as:** `Me`
        *   **Who has access:** **`Anyone`** (Sangat penting agar bisa diakses publik!)
    *   Klik **Deploy**.
    *   Izinkan akses saat diminta (pilih akun Anda, klik *Advanced*, lalu *Go to... (unsafe)*, dan *Allow*).
    *   Salin **Web app URL** yang muncul. URL ini akan digunakan di langkah berikutnya.

> **Catatan:** Setiap kali Anda mengubah file `Code.gs`, Anda **harus** melakukan Deploy ulang dengan memilih **Manage deployments** > **Edit (ikon pensil)** > **Version: New version** > **Deploy**.

### Langkah 3: Konfigurasi dan Hosting Frontend

Ini adalah file yang akan dilihat oleh pengguna.

1.  **Dapatkan File:** Anda memerlukan dua file: `index.html` dan `lupa-nisn.html`.
2.  **Update URL API:** Buka kedua file tersebut dengan editor teks. Cari baris di bagian `<script>`:
    ```javascript
    const WEB_APP_URL = 'URL_LAMA_DI_SINI';
    ```
    Ganti `URL_LAMA_DI_SINI` dengan **Web app URL** yang Anda salin dari Langkah 2.
3.  **Hosting:**
    *   Unggah kedua file (`index.html` dan `lupa-nisn.html`) ke layanan hosting pilihan Anda (misal: cPanel hosting sekolah, GitHub Pages, Netlify, Vercel, dll).
    *   Pastikan kedua file berada di **direktori yang sama**.

Aplikasi Anda kini sudah live dan siap digunakan!

---

## Panduan Pengelolaan Sehari-hari

### Untuk Administrator / Panitia

Tugas Anda sekarang sangat mudah dan tidak memerlukan sentuhan teknis.

*   **Mengubah Data Kelulusan:** Cukup buka spreadsheet `Database SPMB`, buka sheet `Sheet1`, dan edit data siswa (nama, NISN, status `Keterangan`, dll). Perubahan akan **langsung aktif** di website.
*   **Membuka/Menutup Pengumuman:** Buka sheet `Settings`, cari baris `Status Pengumuman`, dan ubah nilainya menjadi `BUKA` atau `TUTUP`.
*   **Mengganti Tahun Ajaran/Logo:** Cukup ubah nilai yang sesuai di sheet `Settings`.

> Anda **TIDAK PERLU** melakukan deploy ulang Apps Script untuk tugas-tugas di atas.

### Untuk Siswa (Pengguna Akhir)

1.  **Cek Kelulusan:** Buka link utama, masukkan NISN, lalu klik tombol "Cek Hasil Seleksi".
2.  **Lupa NISN:** Klik link "Lupa atau tidak tahu NISN Anda?", lalu ketik sebagian nama Anda untuk menemukan data dan melihat NISN.

---

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.