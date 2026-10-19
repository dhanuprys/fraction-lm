import {
	bold,
	bulletList,
	doc,
	heading,
	image,
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
							heading(2, 'Lembar Kerja: Konsep dan Makna Pecahan'),
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
						questions: [
							// ── Aktivitas 1.1a: Count objects (numeric) ──────────────────
							{
								learningObjective:
									'Siswa dapat menghitung jumlah bagian yang dimakan dari gambar.',
								questionType: 'numeric',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.1a: Menghitung Bagian Pizza Ketty',
									),
									p(
										'Rini memiliki dua anak kucing bernama Ketty dan Ochan. Mereka suka makan pizza. Perhatikan gambar pizza Ketty dan Ochan di bawah ini!',
									),
									image(
										'/images/topic1/pizza_ketty_ochan.svg',
										'Pizza Ketty dan Pizza Ochan',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa potong pizza yang sudah dimakan Ketty?',
									),
									p(
										'(Petunjuk: Perhatikan pizza Ketty yang dipotong menjadi 8 bagian sama besar. Hitung berapa potong yang sudah hilang/dimakan!)',
									),
								),
								answerConfig: {
									prompt: 'Jumlah potong pizza yang dimakan Ketty:',
									unit: 'potong',
								},
								questionLlmContext:
									'Konteks Visual & Soal:\n' +
									'Siswa melihat gambar SVG "pizza_ketty_ochan.svg" yang menampilkan dua pizza di atas nampan kayu:\n' +
									'- Kiri: Pizza Ketty dipotong menjadi 8 bagian sama besar. Ada 5 potong utuh bertabur keju dan pepperoni, serta 3 potong kosong (hanya tersisa remahan dan garis putus-putus berlabel "Bagian Dimakan 🍽️").\n' +
									'- Kanan: Pizza Ochan dipotong menjadi 6 bagian sama besar. Ada 3 potong utuh dan 3 potong kosong berlabel "Bagian Dimakan 🍽️".\n' +
									'Tugas siswa: Menghitung berapa potong pizza yang sudah dimakan Ketty.\n' +
									'Jawaban benar: 3 potong.\n' +
									'Jika siswa bertanya tentang gambar: Jelaskan bahwa pizza Ketty dipotong menjadi 8 bagian sama besar, 5 masih ada di piring dan 3 potong sudah kosong/dimakan.',
								evaluationParameters: {
									expected_answer_keywords: ['3'],
									common_misconceptions: [
										'Menjawab 5 (menghitung sisa, bukan yang dimakan)',
										'Menjawab 8 (menghitung total potong)',
									],
									strictness_level: 'lenient',
									hints: [
										'Perhatikan: berapa potong pizza yang sudah hilang?',
										'Hitung bagian pizza yang tidak ada lagi di piringnya.',
										'Ada 8 potong total, 5 masih ada. Berapa yang dimakan?',
									],
								},
								answers: { jumlah: 3 },
							},

							// ── Aktivitas 1.1b: True/False table ─────────────────────────
							{
								learningObjective:
									'Siswa dapat mengevaluasi pernyataan tentang pecahan berdasarkan konteks cerita pizza.',
								questionType: 'true_false_table',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.1b: Evaluasi Perbandingan Porsi Pizza Ketty dan Ochan',
									),
									p(
										'Ketty dan Ochan masing-masing memakan pizza. ',
										'Ketty memakan 3 potong dari 8 potong pizza. ',
										'Ochan memakan 3 potong dari 6 potong pizza.',
									),
									p(
										bold(
											'Pernyataan mana yang benar? Berilah tanda untuk pernyataan benar dan salah.',
										),
									),
								),
								answerConfig: {
									statements: [
										'Ketty dan Ochan masing-masing memakan 3 potong pizza',
										'Keduanya memakan bagian pizza yang sama banyak',
										'Ketty memakan bagian pizza yang lebih banyak daripada Ochan',
										'Ochan memakan bagian pizza yang lebih banyak daripada Ketty',
									],
									labels: ['Benar', 'Salah'],
								},
								questionLlmContext:
									'Konteks Visual & Soal:\n' +
									'Melanjutkan konteks visual gambar dua pizza (Pizza Ketty 8 potong vs Pizza Ochan 6 potong).\n' +
									'Kedua loyang pizza utuh memiliki ukuran yang sama besar. Namun karena pizza Ochan dipotong menjadi lebih sedikit bagian (6 potong) dibanding pizza Ketty (8 potong), maka setiap 1 potong pizza Ochan (1/6) berukuran lebih besar daripada 1 potong pizza Ketty (1/8).\n' +
									'Siswa mengevaluasi 4 pernyataan pada tabel Benar/Salah:\n' +
									'1. "Ketty dan Ochan masing-masing memakan 3 potong pizza" → Benar (keduanya memang memakan 3 potong).\n' +
									'2. "Keduanya memakan bagian pizza yang sama banyak" → Salah (karena ukuran 1 potong pizza Ochan lebih besar dari potongan Ketty).\n' +
									'3. "Ketty memakan bagian pizza yang lebih banyak daripada Ochan" → Salah (3/8 lebih sedikit porsinya daripada 3/6).\n' +
									'4. "Ochan memakan bagian pizza yang lebih banyak daripada Ketty" → Benar (3/6 > 3/8 karena potongan Ochan lebih besar).\n' +
									'Jika siswa bingung: Ajak siswa membayangkan jika sebuah pizza dibagi untuk 6 orang vs 8 orang, mana yang dapat potongan lebih besar.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1:Benar',
										'2:Salah',
										'3:Salah',
										'4:Benar',
									],
									expected_row_answers: [
										true,
										false,
										false,
										true,
									],
									common_misconceptions: [
										'Mengira keduanya sama karena sama-sama 3 potong (padahal ukuran berbeda)',
									],
									strictness_level: 'strict',
									hints: [
										'Perhatikan: apakah pizza Ketty dan Ochan dipotong jadi jumlah potongan yang sama?',
										'Pizza Ketty dipotong 8, pizza Ochan dipotong 6. Mana yang potongannya lebih besar?',
										'Jika pizza ukurannya sama tapi dipotong lebih sedikit, setiap potongannya lebih besar.',
									],
								},
								answers: {
									0: true,
									1: false,
									2: false,
									3: true,
								},
							},

							// ── Aktivitas 1.1c: True/False table (Ochan) ────────────────
							{
								learningObjective:
									'Siswa dapat memahami notasi pecahan dan mengevaluasi kebenaran pernyataan tentang pecahan pizza Ochan.',
								questionType: 'true_false_table',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.1c: Notasi Pecahan dan Porsi Pizza Ochan',
									),
									p(
										'Mari kita pelajari cara menuliskan bagian pizza Ketty dan Ochan dalam bentuk pecahan:',
									),
									image(
										'/images/topic1/infografis_pecahan_3_8.svg',
										'Infografis Pecahan 3/8: Pembilang dan Penyebut',
									),
									p(
										'Sekarang perhatikan pizza yang dimakan Ochan. Ochan memakan 3 potong dari pizza yang dibagi 6 bagian sama besar.',
									),
									p(
										bold(
											'Pernyataan mana yang benar? Berilah tanda centang pada pernyataan yang benar dan salah:',
										),
									),
								),
								answerConfig: {
									statements: [
										'Ochan telah memakan $\\frac{3}{6}$ bagian dari sebuah pizza.',
										'Ochan telah memakan $\\frac{6}{3}$ bagian dari sebuah pizza.',
										'Kedua pizza tersebut memiliki ukuran yang sama.',
										'Pecahan $\\frac{3}{6}$ menggambarkan porsi yang lebih besar daripada $\\frac{3}{8}$.',
									],
									labels: ['Benar', 'Salah'],
								},
								questionLlmContext:
									'Konteks Visual & Soal:\n' +
									'Siswa melihat infografis edukatif "infografis_pecahan_3_8.svg" yang menjelaskan konsep pembilang dan penyebut:\n' +
									'- Banner atas: "Kita menyebutnya: 3 per delapan" dan notasi pecahan besar \\frac{3}{8}.\n' +
									'- Panel merah (kiri atas): Menjelaskan PEMBILANG (angka 3 merah di atas garis) = jumlah bagian yang diambil/dimakan Ketty.\n' +
									'- Panel biru (kiri bawah): Menjelaskan PENYEBUT (angka 8 biru di bawah garis) = seluruh bagian yang sama besar dari pizza.\n' +
									'- Diagram lingkaran pizza di tengah dengan 3 juring berwarna merah dan 5 juring lainnya abu-abu terang.\n' +
									'Pertanyaan: Siswa mengevaluasi 4 pernyataan Benar/Salah untuk pizza Ochan (memakan 3 dari 6 potong):\n' +
									'1. "Ochan telah memakan \\frac{3}{6} bagian dari sebuah pizza." → Benar (pembilang 3, penyebut 6).\n' +
									'2. "Ochan telah memakan \\frac{6}{3} bagian dari sebuah pizza." → Salah (terbalik; pembilang dan penyebut tertukar).\n' +
									'3. "Kedua pizza tersebut memiliki ukuran yang sama." → Benar (kedua loyang pizza aslinya sama besar).\n' +
									'4. "Pecahan \\frac{3}{6} menggambarkan porsi yang lebih besar daripada \\frac{3}{8}." → Benar (\\frac{3}{6} = setengah pizza, sedangkan \\frac{3}{8} kurang dari setengah).\n' +
									'Jika siswa bertanya tentang gambar infografis: Jelaskan kaitan warna merah (pembilang/bagian dimakan) dan biru (penyebut/seluruh bagian sama besar).',
								evaluationParameters: {
									expected_answer_keywords: [
										'1:Benar',
										'2:Salah',
										'3:Benar',
										'4:Benar',
									],
									expected_row_answers: [
										true,
										false,
										true,
										true,
									],
									common_misconceptions: [
										'Mengira 6/3 sama dengan 3/6',
										'Mengira 3/6 dan 3/8 sama besar karena pembilangnya sama',
									],
									strictness_level: 'strict',
									hints: [
										'Ingat: pembilang di atas, penyebut di bawah. Apakah 6/3 sama dengan 3/6?',
										'Bandingkan 3/6 dan 3/8. Pembilangnya sama-sama 3, tapi penyebutnya beda.',
										'Semakin kecil penyebut, semakin besar setiap bagiannya. Jadi 3/6 lebih besar dari 3/8.',
									],
								},
								answers: {
									0: true,
									1: false,
									2: true,
									3: true,
								},
							},

							// ── Aktivitas 1.2: Fraction input ────────────────────────────
							{
								learningObjective:
									'Siswa dapat menuliskan pecahan serta mengidentifikasi pembilang dan penyebut.',
								questionType: 'fraction_input',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.2: Membaca dan Menuliskan Lambang Pecahan',
									),
									p(
										'Perhatikan setiap butir soal di bawah ini. Tuliskan pecahan pada kotak pecahan atau sebutkan pembilang dan penyebutnya sesuai yang diminta.',
									),
								),
								answerConfig: {
									fields: [
										{
											prompt: 'Pembilang adalah 7, penyebutnya adalah 12.',
										},
										{
											prompt: 'Pembilang adalah 6, penyebutnya adalah 8.',
										},
										{
											mode: 'identify',
											displayFraction: {
												numerator: 5,
												denominator: 11,
											},
											prompt: 'Tentukan pembilang dan penyebut dari pecahan ini:',
										},
										{
											prompt: 'Pembilang adalah 8, penyebut adalah ... ($\\frac{\\square}{9}$)',
											prefilled: { denominator: 9 },
										},
										{
											prompt: 'Pembilang adalah ..., penyebut adalah 10 ($\\frac{1}{\\square}$)',
											prefilled: { numerator: 1 },
										},
									],
								},
								questionLlmContext:
									'Konteks Visual & Widget Interaktif:\n' +
									'Siswa melihat formulir interaktif 5 butir soal dengan variasi tampilan:\n' +
									'1. Butir 1: Teks "Pembilang adalah 7, penyebutnya adalah 12." Siswa mengisi kotak atas (7) dan kotak bawah (12) → \\frac{7}{12}.\n' +
									'2. Butir 2: Teks "Pembilang adalah 6, penyebutnya adalah 8." Siswa mengisi kotak atas (6) dan kotak bawah (8) → \\frac{6}{8}.\n' +
									'3. Butir 3 (Mode Identifikasi Terbalik): Ditampilkan badge pecahan \\frac{5}{11}. Siswa diminta mengisi dua kolom input bertuliskan "Pembilang:" [ ] dan "Penyebut:" [ ]. Jawaban: Pembilang = 5, Penyebut = 11.\n' +
									'4. Butir 4 (Template Parsial): Teks "Pembilang adalah 8, penyebut adalah ... (\\frac{\\square}{9})". Kotak penyebut di layar sudah terisi angka 9 terkunci. Siswa hanya perlu mengisi kotak pembilang dengan angka 8 → \\frac{8}{9}.\n' +
									'5. Butir 5 (Template Parsial): Teks "Pembilang adalah ..., penyebut adalah 10 (\\frac{1}{\\square})". Kotak pembilang di layar sudah terisi angka 1 terkunci. Siswa hanya perlu mengisi kotak penyebut dengan angka 10 → \\frac{1}{10}.\n' +
									'Jika siswa bingung: Ingatkan bahwa angka di atas adalah pembilang dan angka di bawah adalah penyebut.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{7}{12}',
										'7/12',
										'\\frac{6}{8}',
										'6/8',
										'5',
										'11',
										'\\frac{5}{11}',
										'5/11',
										'\\frac{8}{9}',
										'8/9',
										'\\frac{1}{10}',
										'1/10',
									],
									common_misconceptions: [
										'Menukar posisi pembilang dan penyebut (contoh: 12/7)',
										'Pada pecahan 5/11, keliru menyebut pembilang sebagai 11',
									],
									strictness_level: 'strict',
									hints: [
										'Pembilang ditulis di atas garis pecahan, penyebut di bawah.',
										'Untuk soal 3 (5/11): angka di atas (5) adalah pembilang, angka di bawah (11) adalah penyebut.',
										'Untuk soal 4: penyebutnya sudah 9, pembilangnya adalah 8.',
										'Untuk soal 5: pembilangnya sudah 1, penyebutnya adalah 10.',
									],
								},
								answers: {
									fractions: [
										{ numerator: 7, denominator: 12 },
										{ numerator: 6, denominator: 8 },
										{ numerator: 5, denominator: 11 },
										{ numerator: 8, denominator: 9 },
										{ numerator: 1, denominator: 10 },
									],
								},
							},

							// ── Aktivitas 1.3: Pizza Pius (True/False) ──────────────────
							{
								learningObjective:
									'Siswa dapat menentukan apakah potongan yang tidak sama besar bisa disebut pecahan.',
								questionType: 'true_false_table',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.3: Pembagian Pizza Pius (Syarat Bagian Sama Besar)',
									),
									p(
										'Pius membeli sebuah pizza untuk dirinya dan dua saudaranya. ' +
											'Ibunya berkata: "Potonglah pizza itu sedemikian rupa sehingga setiap orang mendapatkan sepertiga bagian."',
									),
									image(
										'/images/topic1/pizza_pius_unequal.svg',
										'Cara Pius Memotong Pizza Menjadi 3 Bagian',
									),
									p(
										'Pius mengambil sebuah pisau dan memotong pizza menjadi 3 bagian seperti pada gambar di atas.',
									),
									p(
										'Pius berkata: ',
										bold(
											'"Saya mengambil potongan yang di tengah. Potongan itu adalah salah satu dari tiga potongan, jadi merupakan sepertiga dari pizza."',
										),
									),
									p(
										bold(
											'Apa pendapatmu tentang hal itu? Berilah tanda centang pada pernyataan Benar atau Salah:',
										),
									),
								),
								answerConfig: {
									statements: [
										'Pius telah memotong pizza tersebut menjadi tiga bagian.',
										'Ketiga bagian tersebut memiliki ukuran yang berbeda-beda.',
										'Setiap potongan merupakan $\\frac{1}{3}$ bagian dari pizza.',
										'Hanya jika pizza dipotong menjadi 3 bagian yang sama besar, maka satu potong merupakan $\\frac{1}{3}$ bagian dari pizza.',
									],
									labels: ['Benar', 'Salah'],
								},
								questionLlmContext:
									'Konteks Visual & Soal:\n' +
									'Siswa melihat gambar SVG "pizza_pius_unequal.svg" yang menampilkan pizza bundar di atas nampan kayu yang dipotong oleh Pius menggunakan 2 garis lurus paralel:\n' +
									'- Potongan 1 (tepi atas): potongan kecil melengkung.\n' +
									'- Potongan 2 (tengah): pita lebar sangat besar berwarna biru berlabel "★ Potongan Pius (Sangat Besar)".\n' +
									'- Potongan 3 (tepi bawah): potongan kecil melengkung.\n' +
									'- Balon kata Pius: Pius mengklaim bahwa karena pizza dipotong jadi 3 bagian dan dia mengambil 1 potongan tengah, maka dia mendapatkan 1/3 bagian pizza.\n' +
									'- Kotak pesan Ibu: Ibu berpesan "Potonglah pizza sedemikian rupa agar tiap anak dapat sepertiga (1/3) bagian."\n' +
									'Tugas siswa: Menilai 4 pernyataan Benar/Salah:\n' +
									'1. "Pius telah memotong pizza tersebut menjadi tiga bagian." → Benar (memang terbagi menjadi 3 potongan fisik).\n' +
									'2. "Ketiga bagian tersebut memiliki ukuran yang berbeda-beda." → Benar (potongan tengah jauh lebih lebar daripada kedua potongan sisi).\n' +
									'3. "Setiap potongan merupakan \\frac{1}{3} bagian dari pizza." → Salah (karena potongannya tidak sama besar, tidak bisa disebut 1/3!).\n' +
									'4. "Hanya jika pizza dipotong menjadi 3 bagian yang sama besar, maka satu potong merupakan \\frac{1}{3} bagian dari pizza." → Benar (syarat mutlak pecahan adalah bagian harus sama besar).\n' +
									'Bimbingan Socratic: Bimbing siswa melihat ukuran potongan tengah Pius yang jauh lebih besar dan ingatkan syarat pecahan harus SAMA BESAR.',
								evaluationParameters: {
									expected_answer_keywords: [
										'1:Benar',
										'2:Benar',
										'3:Salah',
										'4:Benar',
									],
									expected_row_answers: [
										true,
										true,
										false,
										true,
									],
									common_misconceptions: [
										'Mengira setiap potongan otomatis 1/3 hanya karena ada 3 potongan',
										'Tidak memahami syarat "bagian sama besar" untuk pecahan',
									],
									strictness_level: 'strict',
									hints: [
										'Ingat syarat pecahan: bagian-bagiannya harus sama besar!',
										'Apakah 3 potongan yang tidak sama besar bisa disebut masing-masing 1/3?',
										'Pecahan 1/3 artinya 1 bagian dari 3 bagian yang SAMA BESAR.',
									],
								},
								answers: {
									0: true,
									1: true,
									2: false,
									3: true,
								},
							},

							// ── Aktivitas 1.4 Grid 1: 100-cell grid (4 colors) ──────────
							{
								learningObjective:
									'Siswa dapat mewarnai bagian dari grid 100 kotak sesuai pecahan yang ditentukan.',
								questionType: 'grid_coloring',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.4: Mewarnai Grid 100 Persegi (Bidang Pertama)',
									),
									p(
										'Kotak-kotak berikut dibagi menjadi 100 persegi yang sama besar. ',
										bold('Warnailah pada bidang pertama:'),
									),
									bulletList(
										'$\\frac{50}{100}$ dengan warna merah',
										'$\\frac{10}{100}$ dengan warna biru',
										'$\\frac{2}{100}$ dengan warna hijau',
										'$\\frac{1}{100}$ dengan warna hitam',
									),
								),
								answerConfig: {
									rows: 10,
									cols: 10,
									instructions: [
										{
											fraction: '50/100',
											color: 'red',
											label: '$\\frac{50}{100}$ merah',
										},
										{
											fraction: '10/100',
											color: 'blue',
											label: '$\\frac{10}{100}$ biru',
										},
										{
											fraction: '2/100',
											color: 'green',
											label: '$\\frac{2}{100}$ hijau',
										},
										{
											fraction: '1/100',
											color: 'black',
											label: '$\\frac{1}{100}$ hitam',
										},
									],
								},
								questionLlmContext:
									'Konteks Visual & Widget Interaktif:\n' +
									'Siswa melihat grid interaktif 10 baris x 10 kolom (total 100 kotak kecil putih sama besar) disertai 4 palet warna dan tombol penghapus:\n' +
									'- 50/100 dengan pensil merah (50 kotak merah, tepat setengah grid atau 5 baris/kolom penuh).\n' +
									'- 10/100 dengan pensil biru (10 kotak biru, tepat 1 baris/kolom penuh).\n' +
									'- 2/100 dengan pensil hijau (2 kotak hijau).\n' +
									'- 1/100 dengan pensil hitam (1 kotak hitam).\n' +
									'Total yang diwarnai: 63 kotak, sisa 37 kotak putih kosong.\n' +
									'Bimbingan: Karena penyebutnya sudah 100 dan total grid ada 100 kotak, angka pembilang langsung menunjukkan berapa jumlah kotak yang harus diwarnai untuk setiap warna.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{50}{100}',
										'50/100',
										'\\frac{10}{100}',
										'10/100',
										'\\frac{2}{100}',
										'2/100',
										'\\frac{1}{100}',
										'1/100',
									],
									expected_grid_state: {
										red: 50,
										blue: 10,
										green: 2,
										black: 1,
									},
									common_misconceptions: [
										'Salah menghitung jumlah kotak per warna',
										'Tidak mengerti bahwa 50/100 = setengah',
									],
									strictness_level: 'medium',
									hints: [
										'Grid punya 100 kotak. 50/100 artinya setengah = 50 kotak merah.',
										'10/100 = 10 kotak biru. Hitung dengan teliti!',
										'Setelah merah dan biru, tambahkan 2 kotak hijau dan 1 kotak hitam.',
									],
								},
								answers: {
									red: 50,
									blue: 10,
									green: 2,
									black: 1,
								},
							},

							// ── Aktivitas 1.4 Grid 2: 100-cell grid (4 colors) ──────────
							{
								learningObjective:
									'Siswa dapat mewarnai bagian dari grid 100 kotak sesuai pecahan yang ditentukan (bidang kedua).',
								questionType: 'grid_coloring',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.4: Mewarnai Grid 100 Persegi (Bidang Kedua)',
									),
									p(bold('Warnailah pada bidang kedua:')),
									bulletList(
										'$\\frac{25}{100}$ dengan warna merah',
										'$\\frac{12}{100}$ dengan warna biru',
										'$\\frac{8}{100}$ dengan warna hijau',
										'$\\frac{11}{100}$ dengan warna hitam',
									),
								),
								answerConfig: {
									rows: 10,
									cols: 10,
									instructions: [
										{
											fraction: '25/100',
											color: 'red',
											label: '$\\frac{25}{100}$ merah',
										},
										{
											fraction: '12/100',
											color: 'blue',
											label: '$\\frac{12}{100}$ biru',
										},
										{
											fraction: '8/100',
											color: 'green',
											label: '$\\frac{8}{100}$ hijau',
										},
										{
											fraction: '11/100',
											color: 'black',
											label: '$\\frac{11}{100}$ hitam',
										},
									],
								},
								questionLlmContext:
									'Konteks Visual & Widget Interaktif:\n' +
									'Siswa melihat grid interaktif 10x10 kedua (100 kotak persegi) dengan 4 palet warna:\n' +
									'- 25/100 dengan pensil merah (25 kotak merah, seperempat grid).\n' +
									'- 12/100 dengan pensil biru (12 kotak biru).\n' +
									'- 8/100 dengan pensil hijau (8 kotak hijau).\n' +
									'- 11/100 dengan pensil hitam (11 kotak hitam).\n' +
									'Total yang diwarnai: 56 kotak, sisa 44 kotak putih kosong.\n' +
									'Bimbingan: Jika siswa salah menghitung jumlah kotak, ingatkan bahwa 1 kolom atau 1 baris utuh bernilai 10 kotak.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{25}{100}',
										'25/100',
										'\\frac{12}{100}',
										'12/100',
										'\\frac{8}{100}',
										'8/100',
										'\\frac{11}{100}',
										'11/100',
									],
									expected_grid_state: {
										red: 25,
										blue: 12,
										green: 8,
										black: 11,
									},
									common_misconceptions: [
										'Salah menghitung jumlah kotak per warna',
										'Tidak memahami bahwa 25/100 = seperempat',
									],
									strictness_level: 'medium',
									hints: [
										'Grid punya 100 kotak. 25/100 = seperempat = 25 kotak merah.',
										'12/100 = 12 kotak biru. Hitung satu per satu.',
										'Jangan lupa 8 kotak hijau dan 11 kotak hitam.',
									],
								},
								answers: {
									red: 25,
									blue: 12,
									green: 8,
									black: 11,
								},
							},

							// ── Aktivitas 1.5: Identify shaded fractions (ALL 10 diagrams) ──
							{
								learningObjective:
									'Siswa dapat menentukan pecahan yang ditunjukkan oleh bagian yang diarsir.',
								questionType: 'fraction_identify',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.5: Menentukan Bagian Pecahan yang Diarsir',
									),
									p(
										'Tulislah berapa bagian yang diarsir dari keseluruhan bidang yang berbentuk persegi panjang maupun lingkaran.',
									),
								),
								answerConfig: {
									diagrams: [
										// Row 1: DIAGRAM_1_LEFT — rect 2x3, top-right 2 cells shaded
										{
											type: 'rectangle',
											totalParts: 6,
											shadedParts: [1, 2],
											rows: 2,
											cols: 3,
										},
										// Row 1: DIAGRAM_1_RIGHT — circle /8, upper-right + lower-left
										{
											type: 'circle',
											totalParts: 8,
											shadedParts: [1, 5],
										},
										// Row 2: DIAGRAM_2_LEFT — rect 2x6 (12 cells), scattered: top[1,3,5] + bottom[2,4]
										{
											type: 'rectangle',
											totalParts: 12,
											shadedParts: [1, 3, 5, 8, 10],
											rows: 2,
											cols: 6,
										},
										// Row 2: DIAGRAM_2_RIGHT — circle /8, 3 adjacent on left
										{
											type: 'circle',
											totalParts: 8,
											shadedParts: [3, 4, 5],
										},
										// Row 3: DIAGRAM_3_LEFT — diagonal rect 2x3 → 12 triangles, 4 shaded
										// Upper triangles of top row (idx 0,2,4) + lower triangle of bottom middle (idx 7)
										{
											type: 'diagonal_rectangle',
											totalParts: 12,
											shadedParts: [0, 2, 4, 7],
											rows: 2,
											cols: 3,
										},
										// Row 3: DIAGRAM_3_RIGHT — circle /8, alternating 4
										{
											type: 'circle',
											totalParts: 8,
											shadedParts: [0, 2, 4, 6],
										},
										// Row 4: DIAGRAM_4_LEFT — rect /2 halves, upper shaded
										{
											type: 'rectangle',
											totalParts: 2,
											shadedParts: [0],
											rows: 2,
											cols: 1,
										},
										// Row 4: DIAGRAM_4_RIGHT — circle /4, left 2 quadrants
										{
											type: 'circle',
											totalParts: 4,
											shadedParts: [2, 3],
										},
										// Row 5: DIAGRAM_5_LEFT — vertical rect /5 strips, top 2 shaded
										{
											type: 'rectangle',
											totalParts: 5,
											shadedParts: [0, 1],
											rows: 5,
											cols: 1,
										},
										// Row 5: DIAGRAM_5_RIGHT — vertical rect /6 strips, top 3 shaded
										{
											type: 'rectangle',
											totalParts: 6,
											shadedParts: [0, 1, 2],
											rows: 6,
											cols: 1,
										},
									],
								},
								questionLlmContext:
									'Konteks Visual Lengkap 10 Diagram Arsir:\n' +
									'Siswa melihat lembar kerja 5 baris diagram (masing-masing baris terdiri dari diagram kiri dan kanan) dengan kotak input pecahan di sebelahnya:\n' +
									'1. Baris 1 Kiri: Persegi panjang 2x3 (6 kotak sama besar). 2 kotak di baris atas sebelah kanan diarsir abu-abu → \\frac{2}{6}.\n' +
									'2. Baris 1 Kanan: Lingkaran dibagi 8 juring sama besar. 2 juring diarsir (1 di kanan-atas, 1 di kiri-bawah) → \\frac{2}{8}.\n' +
									'3. Baris 2 Kiri: Persegi panjang 2x6 (12 kotak). 5 kotak diarsir tersebar (baris atas kotak 2, 4, 6; baris bawah kotak 3, 5) → \\frac{5}{12}.\n' +
									'4. Baris 2 Kanan: Lingkaran dibagi 8 juring. 3 juring berdampingan di sisi kiri diarsir → \\frac{3}{8}.\n' +
									'5. Baris 3 Kiri: Persegi panjang 2x3 dengan garis diagonal di setiap kotak (membentuk 12 segitiga sama besar). 4 segitiga diarsir abu-abu (3 segitiga atas di baris 1, dan 1 segitiga bawah di baris 2 tengah) → \\frac{4}{12}.\n' +
									'6. Baris 3 Kanan: Lingkaran dibagi 8 juring. 4 juring diarsir berselang-seling (selang satu putih) → \\frac{4}{8}.\n' +
									'7. Baris 4 Kiri: Persegi panjang dibagi 2 bagian horizontal (atas dan bawah). Bagian atas diarsir → \\frac{1}{2}.\n' +
									'8. Baris 4 Kanan: Lingkaran dibagi 4 kuadran. 2 kuadran di sisi kiri diarsir → \\frac{2}{4}.\n' +
									'9. Baris 5 Kiri: Persegi panjang vertikal dibagi menjadi 5 bilah horizontal. 2 bilah teratas diarsir → \\frac{2}{5}.\n' +
									'10. Baris 5 Kanan: Persegi panjang vertikal dibagi menjadi 6 bilah horizontal. 3 bilah teratas diarsir → \\frac{3}{6}.\n' +
									'Petunjuk untuk Tutor: Jika siswa menanyakan gambar tertentu (misal: "gambar nomor 5 yang segitiga"), gunakan deskripsi visual di atas untuk membimbingnya: hitung berapa bagian/segitiga yang diarsir sebagai pembilang dan total seluruh bagian sebagai penyebut.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{2}{6}',
										'2/6',
										'\\frac{2}{8}',
										'2/8',
										'\\frac{5}{12}',
										'5/12',
										'\\frac{3}{8}',
										'3/8',
										'\\frac{4}{12}',
										'4/12',
										'\\frac{4}{8}',
										'4/8',
										'\\frac{1}{2}',
										'1/2',
										'\\frac{2}{4}',
										'2/4',
										'\\frac{2}{5}',
										'2/5',
										'\\frac{3}{6}',
										'3/6',
									],
									common_misconceptions: [
										'Menulis penyebut sebagai bagian yang tidak diarsir',
										'Membalik pembilang dan penyebut',
										'Untuk gambar diagonal, salah menghitung segitiga',
									],
									strictness_level: 'strict',
									hints: [
										'Pembilang = jumlah bagian yang diarsir (berwarna).',
										'Penyebut = jumlah seluruh bagian (diarsir + tidak diarsir).',
										'Untuk gambar dengan garis diagonal, setiap kotak dibagi 2 segitiga. Hitung segitiga, bukan kotak.',
									],
								},
								answers: {
									fractions: [
										{ numerator: 2, denominator: 6 },
										{ numerator: 2, denominator: 8 },
										{ numerator: 5, denominator: 12 },
										{ numerator: 3, denominator: 8 },
										{ numerator: 4, denominator: 12 },
										{ numerator: 4, denominator: 8 },
										{ numerator: 1, denominator: 2 },
										{ numerator: 2, denominator: 4 },
										{ numerator: 2, denominator: 5 },
										{ numerator: 3, denominator: 6 },
									],
								},
							},

							// ── Aktivitas 1.6: Grid coloring 3x4 (1/6) ──────────────────
							{
								learningObjective:
									'Siswa dapat mewarnai bagian dari sebuah grid sesuai pecahan yang ditentukan menggunakan pemahaman pecahan senilai.',
								questionType: 'grid_coloring',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.6: Penalaran Pecahan Senilai pada Grid 12 Kotak',
									),
									p(
										'Warnailah $\\frac{1}{6}$ bagian dari kotak di bawah ini! Perhatikan percakapan antara Elsa dan Ivon ketika melihat soal ini:',
									),
									image(
										'/images/topic1/grid_12_pairs_ivon.svg',
										'Cara Ivon Menemukan 1/6 dari 12 Kotak',
									),
									p(
										bold('Tugasmu: '),
										'Warnailah kotak-kotak pada grid di bawah sehingga tepat menunjukkan pecahan $\\frac{1}{6}$!',
									),
								),
								answerConfig: {
									rows: 3,
									cols: 4,
									instructions: [
										{
											fraction: '2/12',
											color: 'purple',
											label: '$\\frac{1}{6}$ bagian (= $\\frac{2}{12}$)',
										},
									],
								},
								questionLlmContext:
									'Konteks Visual & Soal:\n' +
									'1. Gambar SVG "grid_12_pairs_ivon.svg" menampilkan dialog Elsa vs Ivon:\n' +
									'   - Elsa: Bingung karena grid memiliki 12 kotak, bukan 6 kotak seperti penyebut pada pecahan 1/6.\n' +
									'   - Ivon: Memberikan strategi penalaran yang brilian: "Bayangkan 12 kotak dibagi untuk 6 orang: 12 ÷ 6 = 2 kotak. Jadi 1/6 bagian sama dengan 2 kotak!".\n' +
									'   - Diagram warna: Grid 3x4 (12 kotak) dikelompokkan menjadi 6 pasang warna (2 oranye, 2 biru, 2 abu-abu, 2 sian, 2 hijau, 2 kuning), menunjukkan secara nyata bahwa 1 dari 6 kelompok berisi 2 kotak (\\frac{1}{6} = \\frac{2}{12}).\n' +
									'2. Grid Interaktif: Di bawah gambar terdapat grid 3 baris x 4 kolom (12 kotak putih) dengan instruksi mewarnai \\frac{1}{6} bagian.\n' +
									'Tugas siswa: Mewarnai tepat 2 kotak pada grid interaktif.\n' +
									'Bimbingan Socratic: Jika siswa hanya mewarnai 1 kotak (terkecoh angka 1), arahkan siswa untuk melihat penjelasan Ivon pada gambar: jika 12 kotak dibagi rata untuk 6 kelompok, berapa isi tiap kelompok?',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{2}{12}',
										'2/12',
										'2 kotak',
										'\\frac{1}{6}',
										'1/6',
									],
									expected_grid_state: { purple: 2 },
									common_misconceptions: [
										'Mengira 1/6 dari 12 adalah 1 kotak (bukan 2)',
										'Bingung karena ada 12 kotak tapi diminta 1/6',
									],
									strictness_level: 'medium',
									hints: [
										'Ada 12 kotak total. Berapa 1/6 dari 12?',
										'Bayangkan 12 kotak dibagi menjadi 6 kelompok yang sama. Berapa kotak per kelompok?',
										'12 / 6 = 2. Jadi 1/6 dari 12 kotak = 2 kotak.',
									],
								},
								answers: {
									colored_count: 2,
									fraction: '2/12',
									equivalent: '1/6',
								},
							},

							// ── Aktivitas 1.7: Grid coloring 4x6 (5/8) ──────────────────
							{
								learningObjective:
									'Siswa dapat mengarsir bagian dari sebuah grid sesuai pecahan yang ditentukan.',
								questionType: 'grid_coloring',
								questionUi: doc(
									heading(
										3,
										'Aktivitas 1.7: Mengarsir Pecahan pada Bidang 24 Kotak',
									),
									p(
										'Bidang di bawah terdiri dari 24 kotak kecil yang sama besar. ' +
											'Arsirlah $\\frac{5}{8}$ bagina dari bidang di bawah ini!',
									),
								),
								answerConfig: {
									rows: 4,
									cols: 6,
									instructions: [
										{
											fraction: '15/24',
											color: 'purple',
											label: '$\\frac{5}{8}$ bagian (= $\\frac{15}{24}$)',
										},
									],
								},
								questionLlmContext:
									'Konteks Visual & Soal:\n' +
									'Siswa melihat grid interaktif berukuran 4 baris x 6 kolom (total 24 kotak kecil putih sama besar).\n' +
									'Instruksi: "Arsirlah 5/8 bagian dari bidang di bawah ini!".\n' +
									'Penalaran Matematika:\n' +
									'- Total kotak dalam grid = 24 kotak.\n' +
									'- Pecahan yang diminta = \\frac{5}{8}.\n' +
									'- Cari ukuran 1/8 bagian: 24 dibagi 8 kelompok = 3 kotak per kelompok (1/8 = 3 kotak).\n' +
									'- Karena diminta 5/8 bagian: 5 × 3 kotak = 15 kotak (\\frac{5}{8} senilai dengan \\frac{15}{24}).\n' +
									'Tugas siswa: Mewarnai tepat 15 kotak (posisi bebas).\n' +
									'Bimbingan Socratic: Jika siswa menjawab 5 kotak (hanya melihat pembilang 5 tanpa memperhatikan total 24 kotak), bimbing langkah demi langkah: "Kotak di layar ada 24 buah. Kalau kita bagi menjadi 8 kelompok sama rata, setiap kelompok ada berapa kotak? Lalu kalau kita ambil 5 kelompok, berapa kotak semuanya?"',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{15}{24}',
										'15/24',
										'15 kotak',
										'\\frac{5}{8}',
										'5/8',
									],
									expected_grid_state: { purple: 15 },
									common_misconceptions: [
										'Mengira 5/8 dari 24 adalah 5 kotak',
										'Bingung bagaimana mengubah 5/8 ke jumlah kotak dari 24',
									],
									strictness_level: 'medium',
									hints: [
										'Ada 24 kotak total. Kita perlu mewarnai 5/8 bagiannya.',
										'Pertama cari: berapa kotak dalam 1/8? 24 dibagi 8 = 3 kotak.',
										'Jadi 5/8 = 5 x 3 = 15 kotak. Warnailah 15 kotak!',
									],
								},
								answers: {
									colored_count: 15,
									fraction: '15/24',
									equivalent: '5/8',
								},
							},
						],
					},
				],
			},
		],
	};
