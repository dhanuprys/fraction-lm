# Metadia Thumbnails Asset Directory
====================================

Direktori ini menyimpan aset gambar thumbnail resmi untuk **Topik** dan **Subtopik** modul pembelajaran pecahan Metadia.

Ketika seeder dijalankan (`bun run seed`), gambar thumbnail akan secara otomatis disalin ke direktori `./uploads/` dan ditautkan ke kolom `thumbnail` di database (format path: `/uploads/topic-<slug>.png` atau `/uploads/subtopic-<slug>.png`).

---

## Struktur Direktori & Konvensi Penamaan

Semua berkas dan direktori menggunakan konvensi **lowercase kebab-case** yang persis sama dengan nilai `slug` pada data kurikulum. Format gambar yang didukung: `.png`, `.jpg`, `.jpeg`, `.webp`.

```text
metadia-thumbnails/
├── topics/
│   ├── bilangan-pecahan.webp
│   ├── pecahan-senilai-membandingkan-pecahan.webp
│   └── penjumlahan-pengurangan-bilangan-pecahan.webp
└── subtopics/
    ├── konsep-dan-makna-pecahan.webp
    ├── membandingkan-dua-pecahan.webp
    ├── mengurutkan-pecahan.webp
    ├── pecahan-sejati-dan-tidak-sejati.webp
    ├── pecahan-yang-setara.webp
    ├── penyederhanaan-pecahan.webp
    ├── perluasan-pecahan.webp
    ├── penjumlahan-bilangan-pecahan.webp
    └── pengurangan-bilangan-pecahan.webp
```

---

## Daftar Slug Topik & Subtopik

### Topik 1: Bilangan Pecahan
- Slug Topik: `bilangan-pecahan`
- Subtopik:
  - `konsep-dan-makna-pecahan` (Subtopik 1.1)

### Topik 2: Pecahan Senilai dan Membandingkan Pecahan
- Slug Topik: `pecahan-senilai-membandingkan-pecahan`
- Subtopik:
  - `membandingkan-dua-pecahan` (Subtopik 2.1)
  - `mengurutkan-pecahan` (Subtopik 2.2)
  - `pecahan-sejati-dan-tidak-sejati` (Subtopik 2.3)
  - `pecahan-yang-setara` (Subtopik 2.4)
  - `penyederhanaan-pecahan` (Subtopik 2.5)
  - `perluasan-pecahan` (Subtopik 2.6)

### Topik 3: Penjumlahan dan Pengurangan Bilangan Pecahan
- Slug Topik: `penjumlahan-pengurangan-bilangan-pecahan`
- Subtopik:
  - `penjumlahan-bilangan-pecahan` (Subtopik 3.1)
  - `pengurangan-bilangan-pecahan` (Subtopik 3.2)

---

## Cara Menambahkan Thumbnail Baru Nanti
Cukup letakkan berkas gambar dengan nama `<slug-subtopik>.png` di dalam folder `subtopics/`, lalu jalankan kembali `bun run seed`. Seeder akan otomatis mendeteksi dan menautkannya ke database!
