import { topic1Exercise1Questions } from './exercises/topic1-exercise1';
import {
	bold,
	bulletList,
	doc,
	heading,
	math,
	orderedList,
	p,
} from './helpers';

export const topic1 =
	// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  TOPIC 1  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	{
		name: 'Bilangan Pecahan',
		slug: 'bilangan-pecahan',
		description:
			'Memahami konsep dasar pecahan sebagai bagian dari keseluruhan, mengenal bentuk penulisannya, serta belajar membaca dan menuliskan pecahan. Topik ini adalah fondasi untuk seluruh materi pecahan.',
		order: 1,
		subTopics: [
			{
				name: 'Konsep dan Makna Pecahan',
				slug: 'konsep-dan-makna-pecahan',
				description:
					'Membangun pemahaman dasar tentang pecahan: apa itu pecahan, bagaimana menggambarkannya, cara penulisannya, serta cara membaca dan menuliskannya.',
				order: 1,
				materials: [
					// ───────────────────────── MATERI 1 ─────────────────────────
					{
						title: 'Pengertian Pecahan dan Gambar Bagiannya',
						order: 1,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Apa Itu Pecahan?'),
							p(
								'Pecahan adalah cara kita menyatakan ',
								bold('bagian dari keseluruhan'),
								'. Bayangkan kamu punya sebuah kue utuh, lalu kue itu dipotong menjadi beberapa bagian yang ',
								bold('sama besar'),
								'.',
							),
							heading(3, 'Syarat Sebuah Pecahan'),
							bulletList(
								'Ada sebuah benda atau kumpulan yang utuh',
								'Benda itu dibagi menjadi beberapa bagian',
								'Semua bagian harus sama besar',
							),
							heading(3, 'Menggambarkan Bagian Pecahan'),
							p(
								'Kita bisa menggambarkan pecahan dengan mewarnai bagian dari sebuah gambar. Perhatikan contoh berikut, di mana kotak berwarna menunjukkan bagian yang diambil:',
							),
							bulletList(
								'🟩⬜ → 1 dari 2 bagian sama besar, yaitu setengah',
								'🟩⬜⬜⬜ → 1 dari 4 bagian sama besar, yaitu seperempat',
								'🟩🟩🟩⬜ → 3 dari 4 bagian sama besar, yaitu tiga perempat',
								'🟩🟩⬜⬜⬜⬜ → 2 dari 6 bagian sama besar',
							),
							heading(3, 'Contoh'),
							p(
								'Sebuah pizza dipotong menjadi 4 bagian yang sama besar. Kamu mengambil 1 potong. Maka bagian pizza yang kamu ambil adalah:',
							),
							math('\\frac{1}{4}'),
							p(
								bold('Ingat: '),
								'Jika bagiannya tidak sama besar, maka itu bukan pecahan!',
							),
						),
						materialLlmContext:
							'Materi ini membahas pengertian pecahan dan cara menggambarkan bagian pecahan secara visual untuk siswa SD (kelas 3). ' +
							'Pecahan adalah bagian dari keseluruhan yang dibagi menjadi bagian-bagian yang SAMA BESAR. ' +
							'Visualisasi menggunakan kotak berwarna (🟩 = bagian yang diambil, ⬜ = bagian sisa). ' +
							'Contoh: pizza dibagi 4 bagian sama besar, diambil 1 → 1/4. ' +
							'Siswa harus memahami bahwa bagian-bagian harus sama besar, dan bisa menyatakan bagian berwarna pada gambar sebagai pecahan.',
						questions: [],
					},

					// ───────────────────────── MATERI 2 ─────────────────────────
					{
						title: 'Bentuk Penulisan Pecahan',
						order: 2,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Bentuk Penulisan Pecahan'),
							p(
								'Sebuah pecahan ditulis dengan dua angka yang dipisahkan oleh sebuah ',
								bold('garis pecahan'),
								'.',
							),
							math('\\frac{a}{b}'),
							bulletList(
								'Angka di atas garis disebut pembilang',
								'Angka di bawah garis disebut penyebut',
								'Garis di tengah disebut garis pecahan',
							),
							heading(3, 'Arti Pembilang dan Penyebut'),
							bulletList(
								'Pembilang menunjukkan jumlah bagian yang diambil atau diwarnai',
								'Penyebut menunjukkan jumlah seluruh bagian yang sama besar',
							),
							heading(3, 'Contoh'),
							p(
								'Sebuah cokelat dibagi menjadi 5 bagian yang sama besar. Kamu memakan 2 bagian.',
							),
							math('\\frac{2}{5}'),
							bulletList(
								'Pembilang = 2 (bagian yang dimakan)',
								'Penyebut = 5 (seluruh bagian cokelat)',
							),
							p(
								bold('Hati-hati: '),
								'Posisi angkanya tidak boleh tertukar. ',
								'2/5 berbeda dengan 5/2.',
							),
						),
						materialLlmContext:
							'Materi ini mengajarkan bentuk penulisan pecahan: a/b dengan "a" adalah pembilang (angka atas, bagian yang diambil) ' +
							'dan "b" adalah penyebut (angka bawah, jumlah seluruh bagian sama besar), dipisahkan garis pecahan. ' +
							'Contoh: cokelat 5 bagian, dimakan 2 → 2/5 (pembilang 2, penyebut 5).',
						questions: [],
					},

					// ───────────────────────── MATERI 3 ─────────────────────────
					{
						title: 'Membaca dan Menuliskan Pecahan',
						order: 3,
						difficulty: 1,
						isExerciseOnly: false,
						content: doc(
							heading(2, 'Cara Membaca Pecahan'),
							p(
								'Kita membaca pembilang terlebih dahulu, lalu kata ',
								bold('"per"'),
								', kemudian penyebut.',
							),
							bulletList(
								'2/5 dibaca "dua per lima"',
								'3/7 dibaca "tiga per tujuh"',
								'5/8 dibaca "lima per delapan"',
							),
							heading(3, 'Pecahan dengan Nama Khusus'),
							p(
								'Beberapa pecahan punya nama khusus yang sering dipakai sehari-hari:',
							),
							bulletList(
								'1/2 dibaca "setengah"',
								'1/3 dibaca "sepertiga"',
								'1/4 dibaca "seperempat"',
								'3/4 dibaca "tiga perempat"',
							),
							heading(3, 'Cara Menuliskan Pecahan'),
							orderedList(
								'Dengar atau baca bilangan pertama, tulis sebagai pembilang',
								'Gambar garis pecahan di bawahnya',
								'Tulis bilangan setelah kata "per" sebagai penyebut',
							),
							p(
								bold('Contoh: '),
								'"empat per sembilan" ditulis:',
							),
							math('\\frac{4}{9}'),
						),
						materialLlmContext:
							'Materi ini mengajarkan cara membaca dan menuliskan pecahan dalam Bahasa Indonesia. ' +
							'Cara baca: [pembilang] per [penyebut], contoh 3/7 = "tiga per tujuh". ' +
							'Nama khusus: 1/2 = setengah, 1/3 = sepertiga, 1/4 = seperempat, 3/4 = tiga perempat. ' +
							'Cara menulis: bilangan sebelum "per" jadi pembilang, bilangan sesudah "per" jadi penyebut.',
						questions: [],
					},

					// ───────────────────────── LEMBAR KERJA (isExerciseOnly) ─────────────────────────
					{
						title: 'Lembar Kerja: Konsep dan Makna Pecahan',
						order: 4,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(
								2,
								'Lembar Kerja: Konsep dan Makna Pecahan',
							),
							p(
								'Latihan untuk menguji pemahaman siswa tentang seluruh materi pada subtopik ini: pengertian pecahan, bentuk penulisan, serta cara membaca dan menuliskan pecahan.',
							),
						),
						materialLlmContext:
							'Rangkuman Materi & Konsep Bab "Konsep dan Makna Pecahan" (Kelas 3–4 SD):\n' +
							'1. Konsep Dasar Pecahan: Pecahan menyatakan bagian dari keseluruhan yang dibagi menjadi bagian-bagian yang SAMA BESAR. Syarat mutlak: jika potongan tidak sama besar, maka itu bukan pecahan.\n' +
							'2. Bentuk Penulisan \\frac{a}{b}: Bilangan di atas garis adalah "pembilang" (menunjukkan berapa bagian yang diambil/dimakan/diarsir). Bilangan di bawah garis adalah "penyebut" (menunjukkan jumlah seluruh bagian yang sama besar). Garis di tengah disebut garis pecahan. Nilai \\frac{a}{b} berbeda dengan \\frac{b}{a}.\n' +
							'3. Cara Membaca & Menulis Pecahan: Dibaca "[pembilang] per [penyebut]" (misal 2/5 dibaca "dua per lima"). Nama khusus: 1/2 = "setengah", 1/3 = "sepertiga", 1/4 = "seperempat", 3/4 = "tiga perempat".\n' +
							'4. Konteks Cerita Soal (Kucing Rini: Ketty & Ochan):\n' +
							'   - Pizza Ketty dipotong menjadi 8 bagian sama besar. Ketty memakan 3 potong (pecahannya \\frac{3}{8}).\n' +
							'   - Pizza Ochan dipotong menjadi 6 bagian sama besar. Ochan memakan 3 potong (pecahannya \\frac{3}{6}).\n' +
							'   - Keduanya sama-sama memakan 3 potong, TETAPI bagian pizza yang dimakan TIDAK sama banyak, karena ukuran 1 potong pizza Ochan (1 dari 6) lebih besar daripada 1 potong pizza Ketty (1 dari 8). Jadi \\frac{3}{6} > \\frac{3}{8}.\n' +
							'5. Peran Tutor Socratic: Bimbing siswa mengaitkan jumlah potongan yang dimakan sebagai pembilang dan total potongan keseluruhan sebagai penyebut, serta menyadari pentingnya ukuran potongan yang sama besar.\n' +
							'6. Referensi Visual & Media yang Tersedia di Lembar Kerja:\n' +
							'   - Soal 1 & 2: Gambar SVG "pizza_ketty_ochan.svg" (Pizza Ketty 8 potong vs Pizza Ochan 6 potong di nampan kayu).\n' +
							'   - Soal 3: Infografis SVG "infografis_pecahan_3_8.svg" (Pembilang merah 3, penyebut biru 8, juring pizza 8 bagian).\n' +
							'   - Soal 4: Form input pecahan 5 butir dengan template kosong, badge identifikasi terbalik 5/11, dan template parsial 8/9 serta 1/10.\n' +
							'   - Soal 5: Gambar SVG "pizza_pius_unequal.svg" (Pizza Pius dipotong 2 garis paralel menjadi 3 bagian tidak sama besar; potongan tengah sangat lebar).\n' +
							'   - Soal 6 & 7: Grid interaktif 10x10 (100 kotak) dengan palet pensil merah, biru, hijau, hitam.\n' +
							'   - Soal 8: 10 diagram arsir geometris (persegi panjang, lingkaran 8 juring, persegi panjang diagonal 12 segitiga, bilah horizontal 5 & 6).\n' +
							'   - Soal 9: Gambar SVG "grid_12_pairs_ivon.svg" (Dialog Elsa vs Ivon & grid 3x4 dibagi 6 pasangan warna) + grid interaktif 3x4.\n' +
							'   - Soal 10: Grid interaktif 4x6 (24 kotak) untuk mewarnai 5/8 bagian (15 kotak).\n' +
							'Tutor AI memiliki pengetahuan visual lengkap mengenai apa yang sedang dilihat oleh siswa di layar, sehingga dapat merujuk ke elemen gambar (warna, posisi, bentuk) secara langsung saat berinteraksi.',
						questions: topic1Exercise1Questions,
					},
				],
			},
		],
	};
