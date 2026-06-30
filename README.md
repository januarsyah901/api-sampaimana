# 🏛️ API Platform Transparansi Hukum (NIC) - Backend

> Trigger CI/CD test - test push from local

Backend API lengkap dibangun menggunakan Node.js, Express.js, Prisma ORM, PostgreSQL, dan Swagger UI untuk dokumentasi API.

## 🚀 Fitur Backend

- **Autentikasi & Autorisasi**: Registrasi Kontributor, Login (JWT Token), Refresh Token, Verifikasi Profile, dan Guarding Endpoint berdasarkan role (`SUPER_ADMIN`, `EDITOR`, `VIEWER`, `CONTRIBUTOR`).
- **Manajemen Kasus (Public & Admin)**: Pencarian full-text, pemfilteran berdasarkan kategori atau status, detail kasus, timeline tahapan kronologis.
- **Artikel Penjelasan Detail**: Setiap tahapan memiliki satu artikel mendalam yang menjelaskan dasar penetapan status.
- **Ekspor Data**: Mendukung ekspor daftar kasus ke file CSV dan pencetakan data kasus ke format ramah PDF.
- **Crowdsourcing & Kontribusi**: Kontributor publik dapat mengunggah kemajuan/update kasus baru beserta bukti link maupun file pendukung (foto, dokumen).
- **Moderasi & Validasi**: Dashboard bagi Admin untuk menyetujui atau menolak kontribusi publik dengan pencatatan alasan penolakan.
- **Audit Trail**: Logging otomatis untuk semua tindakan admin/modifikasi data ke tabel `Activity Log`.
- **Dokumentasi Swagger**: API terdokumentasi lengkap dan interaktif menggunakan Swagger UI.

---

## 🛠️ Instalasi & Setup Lokal

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- **Node.js** (v18 atau lebih baru)
- **NPM**
- **PostgreSQL** yang berjalan (bisa menggunakan Docker atau instalasi lokal/Caprover)

### 2. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env` di folder ini:
```bash
cp .env.example .env
```
Sesuaikan nilai `DATABASE_URL` dengan koneksi PostgreSQL Anda. Contoh:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/nic?schema=public"
```

### 3. Instal Dependencies
Jalankan perintah berikut di folder backend:
```bash
npm install
```

### 4. Setup Database & Prisma
Jalankan migrasi database untuk membuat tabel di PostgreSQL:
```bash
# Push skema ke database & generate Prisma Client
npx prisma db push
```

### 5. Jalankan Seed Data Awal
Tanam data mock awal (kategori, pengguna admin, kontributor, dan beberapa kasus contoh):
```bash
npm run prisma:seed
```

### 6. Jalankan Server Development
Jalankan server dalam mode development (dengan reload otomatis menggunakan nodemon):
```bash
npm run dev
```
Server akan berjalan di http://localhost:5000.

---

## 📖 Dokumentasi API (Swagger UI)

Setelah server berjalan, Anda dapat mengakses dokumentasi API lengkap yang interaktif di:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

Di sana, Anda dapat menguji seluruh endpoint secara langsung (termasuk alur Login, Registrasi, CRUD Kasus, Moderasi, dan Pengiriman Kontribusi).

---

## 🔐 Akun Uji Coba Default (Dari Seeder)

1. **Super Admin**:
   - Email: `jan@hallojanu.xyz`
   - Password: `admin12345`
   - Izin: Akses penuh CRUD, moderasi kontribusi publik, manajemen user & log aktivitas.

2. **Kontributor Publik**:
   - Email: `budi@hallojanu.xyz`
   - Password: `kontri123`
   - Izin: Mengajukan kontribusi progress kasus, melihat riwayat kontribusi pribadi.
