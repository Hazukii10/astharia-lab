# ASTHARIA LAB - Portfolio Desain Grafis & Jasa Pembuatan Poster

Website portofolio dan pemesanan jasa desain grafis & poster dengan estetika modern ("kekinian"), dark luxury, neon accent, serta fitur interaktif unggah karya langsung dari browser!

---

## 🎨 Fitur Utama

1. **Galeri Portofolio Dinamis & Filter Kategori**:
   - Filter instan berdasarkan: *Poster Acara*, *Typography*, *Branding & Logo*, *Social Media*, *Merchandise*.
   - Fitur pencarian judul poster & tag.
   - Dilengkapi 6 contoh desain poster berestetika tinggi bawaan.

2. **Fitur Upload Karya Baru Langsung dari Browser**:
   - Tombol **"Upload Karya"** dengan fitur *drag & drop* atau pilih file gambar dari laptop/HP (JPG, PNG, WEBP).
   - Dukungan input URL gambar dari internet.
   - Mengisi Judul, Kategori, Klien/Tahun, Tagar, dan Deskripsi Karya.
   - Karya tersimpan secara otomatis di browser (*LocalStorage*) dan langsung muncul di galeri.

3. **Detail Poster & Lightbox View**:
   - Klik poster mana saja untuk melihat resolusi penuh, detail konsep, dan tag.
   - Tombol instan **"Pesan Desain Gaya Serupa"** yang otomatis mengarahkan ke WhatsApp dengan pesan khusus.
   - Opsi hapus karya jika ingin memperbarui portofolio.

4. **Katalog Jasa & Paket Harga Desain**:
   - **Paket Poster Acara / Event** (Mulai Rp 75.000)
   - **Full Visual Campaign** (Mulai Rp 175.000 - Highlight Populer)
   - **Branding & Logo Kit** (Mulai Rp 350.000)
   - Tombol pemesanan langsung terhubung ke WhatsApp dengan format pesan otomatis.

5. **Formulir Pemesanan Kustom**:
   - Client bisa menginput nama, pilihan paket, deadline, ukuran (A3, IG Story, dll.), dan ringkasan brief.
   - Klik kirim langsung membuka chat WhatsApp dengan template rapi.

6. **Pengaturan Identitas & Nomor WhatsApp (Tanpa Perlu Koding)**:
   - Klik ikon gerigi (⚙️) di navigasi atas.
   - Ubah Nama Studio/Brand, Nama Desainer, Nomor WhatsApp, dan Bio profil.
   - Perubahan langsung aktif di seluruh tombol pemesanan WhatsApp!

---

## 🚀 Cara Menjalankan Website

### Opsi 1: Buka Langsung (Paling Mudah)
Cukup buka file `index.html` dengan klik dua kali di file explorer atau klik kanan lalu pilih **Open with Google Chrome / Microsoft Edge / Firefox**.

### Opsi 2: Jalankan Menggunakan Local Server (Python)
Buka terminal / PowerShell di folder ini, lalu jalankan:
```bash
python -m http.server 8000
```
Lalu buka browser di alamat:
```
http://localhost:8000
```

---

## 🌐 Cara Mengonlinekan (Hosting Gratis)

Website ini adalah website statis murni (*HTML, CSS, JS*), sehingga bisa dihosting 100% gratis kapan saja di:
- **GitHub Pages**: Buat repository baru di GitHub, upload semua file (`index.html`, `style.css`, `app.js`), lalu aktifkan GitHub Pages di tab *Settings > Pages*.
- **Vercel / Netlify**: Tinggal *drag and drop* folder ini ke dashboard [Netlify Drop](https://app.netlify.com/drop) atau [Vercel](https://vercel.com).


---

## Catatan Revisi UI/UX (Arthur, 11 Nov 2026)

File di folder ini adalah HASIL REVISI; file asli Hazukii tidak diubah.

Yang sudah direvisi:
1. Identitas default diganti: brand Astharia Lab, desainer Hazukii, bio resmi, slogan di bawah nama brand. Foto profil stok diganti logo Astharia Lab (assets/logo-astharia.svg) dan poster hero diganti karya asli SURVIVE (assets/poster-survive-patrick.png). Statistik "99% Kepuasan Klien" diganti "3 Pilihan Paket Jasa".
2. Pengaturan lama di browser tidak lagi menimpa identitas baru (kunci penyimpanan pengaturan diganti; karya yang sudah ter-upload tetap dipertahankan).
3. Warna aksi disamakan: biru = aksi navigasi/paket, hijau = aksi WhatsApp (tombol paket, form, konsultasi, tombol melayang). Ada tombol "Order Desain" melayang di HP. Modal detail bisa ditutup dengan Esc; tombol menu & tutup modal diberi label aksesibilitas; anchor section diberi jarak scroll agar tidak tertutup header.
4. Galeri tidak lagi memotong karya: gambar tampil utuh (contain) di kartu. Glow/animasi latar dikurangi intensitasnya (warna & font tetap seperti buatan Hazukii).
5. Link admin dihapus dari footer publik & menu HP (halaman admin tetap dibuka lewat admin.html), dan petunjuk PIN di halaman login admin dicabut.

Masih harus dilengkapi Hazukii sebelum online:
- Nomor WhatsApp asli: ganti nomor contoh 6281234567890 lewat Pengaturan di halaman admin (atau DEFAULT_SETTINGS di app.js/admin.js). Selama belum diganti, tombol WhatsApp masih menuju nomor contoh itu.
- PIN admin: masih 1234 — ganti nilai DEFAULT_PIN di admin.js sebelum dionlinekan.
- Isi galeri bawaan masih contoh (keputusan konten galeri belum dibahas), dan paket/harga belum direvisi (nomor 3 ditunda Hazukii).

## Update 2026-11-11 (sore): WhatsApp asli + halaman order terpisah
- Nomor WhatsApp diganti ke nomor asli Astharia Lab: 0857-4821-5098 (format link 6285748215098) di app.js, admin.js, dan admin.html. Catatan: browser yang pernah menyimpan pengaturan lama mungkin perlu memperbarui nomor sekali di Admin > Pengaturan.
- Pemesanan dipindah ke halaman terpisah: order.html berisi paket jasa, alur kerja, dan formulir pemesanan. Halaman utama (index.html) sekarang hanya berisi beranda/hero, showcase galeri, dan profil/tentang; semua tombol order mengarah ke order.html. app.js dibuat aman untuk kedua halaman (penjaga elemen modal).
- Perubahan ini juga sudah di-upload ke repository GitHub Hazukii10/astharia-lab (GitHub Pages).

## Update 2026-11-11 (sore 2): halaman Alur Kerja & Tentang + slider Best Seller
- Alur Kerja pindah ke halaman sendiri: workflow.html (dikeluarkan dari order.html). Tentang/profil pindah ke halaman sendiri: tentang.html (dikeluarkan dari index.html). Halaman utama kini hanya beranda + showcase galeri. Semua menu di semua halaman diperbarui.
- Box info "Klik gambar untuk lihat detail & pesan" di header galeri dihapus.
- Kotak Featured Design di hero menjadi slider yang bisa digeser (tombol panah, titik indikator, swipe/drag, auto-putar 6 detik) berisi desain Best Seller: SURVIVE — Patrick Edition + karya bertanda bestSeller.
- Filter galeri: tombol "Best Seller" ditambahkan (memfilter karya bestSeller: Neon Horizon, NOMAD Streetwear, Carousel Kit — ketiganya juga punya badge Best Seller di kartu), tombol "Merchandise" dihapus.

## Perbaikan 2026-11-11: sinkronisasi Best Seller untuk data lama
- Ditemukan saat verifikasi live: browser yang sudah pernah membuka versi lama menyimpan data galeri lama (tanpa tanda bestSeller) di localStorage, sehingga filter Best Seller kosong dan slider hanya berisi SURVIVE. Perbaikan: loadData di app.js kini menggabungkan tanda bestSeller dari data bawaan terbaru ke data tersimpan berdasarkan id karya (karya upload pengguna tetap dipertahankan).

## Update 2026-11-11 (sore 3): teks hero, badge slider, logo baru
- Teks hero: "...berdaya tarik tinggi untuk audiens Anda." diganti menjadi "...berdaya tarik tinggi, dan kekinian." Tombol hero "Eksplorasi Galeri Poster" diganti "Eksplorasi Hasil Desain".
- Badge "Featured Design" di slider dihapus; yang tersisa hanya badge "Best Seller".
- Logo digambar ulang (assets/logo-astharia.svg): huruf A kini path geometris presisi di tengah sparkle (bukan teks font Arial seperti sebelumnya yang terlihat kurang tengah), dan logo kiri atas di semua halaman publik diganti dari ikon palette menjadi logo ini. Profil di halaman Tentang memakai file logo yang sama sehingga ikut berubah.

## Update 2026-11-11 (sore 4): logo A dipertebal & naik, Merchandise hilang, SURVIVE masuk galeri
- Logo digambar ulang lagi: huruf A lebih tebal bergaya grotesque dengan puncak rata dan digeser ke atas (titik tengah A di y=110 dari 240). Semua halaman memakai file logo yang sama.
- Kata "Merchandise" dihilangkan sepenuhnya: kategori karya NOMAD Streetwear diganti "Social Media" (data tersimpan pengunjung ikut diselaraskan otomatis lewat loadData).
- Desain SURVIVE — Patrick Edition dimasukkan sebagai karya galeri poster (kategori Typography, Best Seller, urutan pertama) dan slider hero kini mengambil semua slide dari karya bestSeller galeri (tidak lagi hardcode).
