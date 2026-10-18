import {
	bold,
	bulletList,
	diagram,
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

					// ───────────────────────── POST-TEST (isExerciseOnly) ─────────────────────────
					{
						title: 'Post-Test: Konsep dan Makna Pecahan',
						order: 4,
						difficulty: 2,
						isExerciseOnly: true,
						content: doc(
							heading(2, 'Post-Test: Konsep dan Makna Pecahan'),
							p(
								'Latihan untuk menguji pemahaman siswa tentang seluruh materi pada subtopik ini: pengertian pecahan, bentuk penulisan, serta cara membaca dan menuliskan pecahan.',
							),
						),
						materialLlmContext:
							'Latihan ini menguji pemahaman siswa terhadap seluruh materi pada subtopik Konsep dan Makna Pecahan: ' +
							'(1) pengertian pecahan dan gambar bagiannya, (2) bentuk penulisan pecahan (pembilang, penyebut, garis pecahan), ' +
							'(3) membaca dan menuliskan pecahan. Soal menggabungkan konsep-konsep tersebut.',
						questions: [
							// ── Aktivitas 1.1a: Count objects (numeric) ──────────────────
							{
								learningObjective:
									'Siswa dapat menghitung jumlah bagian yang dimakan dari gambar.',
								questionType: 'numeric',
								questionUi: doc(
									p(
										'Rini memiliki dua anak kucing bernama Ketty dan Ochan. Mereka suka makan pizza.',
									),
									p(
										bold('Pertanyaan: '),
										'Berapa potong pizza yang sudah dimakan Ketty?',
									),
									p(
										'(Petunjuk: Pizza Ketty dipotong menjadi 8 bagian. Ketty memakan beberapa potong.)',
									),
								),
								answerConfig: {
									prompt: 'Jumlah potong pizza yang dimakan Ketty:',
									unit: 'potong',
								},
								questionLlmContext:
									'Siswa menghitung berapa potong pizza yang dimakan Ketty. ' +
									'Pizza Ketty dibagi menjadi 8 potong dan Ketty memakan 3 potong. ' +
									'Jawaban benar: 3 potong.',
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
									'Siswa menentukan Benar/Salah untuk 4 pernyataan tentang pizza Ketty dan Ochan. ' +
									'Ketty memakan 3/8, Ochan memakan 3/6. Keduanya memang 3 potong, tapi ukuran potongan berbeda. ' +
									'Jawaban: 1=Benar, 2=Salah, 3=Salah, 4=Benar (3/6 > 3/8 karena potongan Ochan lebih besar).',
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
									'Siswa dapat menentukan kebenaran pernyataan tentang pecahan pizza Ochan.',
								questionType: 'true_false_table',
								questionUi: doc(
									p(
										'Perhatikan pizza yang dimakan Ochan. Ochan memakan 3 potong dari pizza yang dibagi 6 bagian sama besar.',
									),
									p(
										bold(
											'Pernyataan mana yang benar? Berilah tanda centang pada pernyataan yang benar dan X pada yang salah!',
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
									'Siswa menentukan Benar/Salah untuk 4 pernyataan tentang pizza Ochan. ' +
									'Ochan memakan 3 dari 6 potong = $\\frac{3}{6}$. ' +
									'Jawaban: 1=Benar ($\\frac{3}{6}$ benar), 2=Salah ($\\frac{6}{3}$ terbalik), 3=Benar (kedua pizza sama besar), 4=Benar ($\\frac{3}{6} > \\frac{3}{8}$).',
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
									'Siswa dapat menuliskan pecahan jika diketahui pembilang dan penyebutnya.',
								questionType: 'fraction_input',
								questionUi: doc(
									heading(
										3,
										'Tuliskan pecahan-pecahan berikut:',
									),
									p(
										'Lengkapi pembilang dan penyebut pada kotak pecahan di bawah ini.',
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
											prompt: 'Pecahan ini sudah diketahui: $\\frac{5}{11}$',
											prefilled: {
												numerator: 5,
												denominator: 11,
											},
										},
										{
											prompt: 'Pembilang adalah 8, penyebut adalah ...',
											prefilled: { denominator: 9 },
										},
										{
											prompt: 'Pembilang adalah ..., penyebut adalah 10.',
											prefilled: { numerator: 1 },
										},
									],
								},
								questionLlmContext:
									'Siswa menuliskan pecahan dari informasi pembilang/penyebut. ' +
									'Jawaban benar: 1) $\\frac{7}{12}$, 2) $\\frac{6}{8}$, 3) sudah terisi $\\frac{5}{11}$, 4) $\\frac{8}{9}$, 5) $\\frac{1}{10}$.',
								evaluationParameters: {
									expected_answer_keywords: [
										'\\frac{7}{12}',
										'7/12',
										'\\frac{6}{8}',
										'6/8',
										'\\frac{5}{11}',
										'5/11',
										'\\frac{8}{9}',
										'8/9',
										'\\frac{1}{10}',
										'1/10',
									],
									common_misconceptions: [
										'Menukar posisi pembilang dan penyebut (contoh: 12/7)',
									],
									strictness_level: 'strict',
									hints: [
										'Pembilang ditulis di atas garis pecahan, penyebut di bawah.',
										'Untuk soal 4, penyebutnya sudah 9. Pembilangnya berapa?',
										'Untuk soal 5, pembilangnya sudah 1. Penyebutnya berapa?',
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
									p(
										'Pius membeli sebuah pizza untuk dirinya dan dua saudaranya. ' +
											'Ibunya berkata: "Potonglah pizza itu sedemikian rupa sehingga setiap orang mendapatkan sepertiga bagian."',
									),
									p(
										'Pius mengambil sebuah pisau dan memotong pizza menjadi 3 bagian, tetapi ',
										bold(
											'bagian-bagiannya tidak sama besar',
										),
										'.',
									),
									p(bold('Apa pendapatmu tentang hal itu?')),
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
									'Siswa menentukan Benar/Salah tentang pemotongan pizza Pius yang tidak sama besar. ' +
									'Jawaban: 1=Benar (memang 3 bagian), 2=Benar (ukuran berbeda-beda), ' +
									'3=Salah (bukan $\\frac{1}{3}$ karena tidak sama besar), 4=Benar (syarat pecahan: bagian harus sama besar).',
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
										'Aktivitas 1.4 — Bidang Pertama',
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
									'Siswa mewarnai grid 10x10 (100 kotak) dengan 4 warna. ' +
									'Merah: 50 kotak, Biru: 10 kotak, Hijau: 2 kotak, Hitam: 1 kotak. ' +
									'Total diwarnai = 63 kotak, sisa 37 kotak kosong.',
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
									heading(3, 'Aktivitas 1.4 — Bidang Kedua'),
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
									'Siswa mewarnai grid 10x10 (100 kotak) dengan 4 warna. ' +
									'Merah: 25 kotak, Biru: 12 kotak, Hijau: 8 kotak, Hitam: 11 kotak. ' +
									'Total diwarnai = 56 kotak, sisa 44 kotak kosong.',
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
										'Tulislah berapa bagian yang diarsir dari keseluruhan bidang!',
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
											shadedParts: [2, 5],
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
									'Siswa menentukan pecahan dari 10 gambar yang diarsir. ' +
									'Jawaban benar: 1) $\\frac{2}{6}$, 2) $\\frac{2}{8}$, 3) $\\frac{5}{12}$, 4) $\\frac{3}{8}$, 5) $\\frac{4}{12}$, 6) $\\frac{4}{8}$, ' +
									'7) $\\frac{1}{2}$, 8) $\\frac{2}{4}$, 9) $\\frac{2}{5}$, 10) $\\frac{3}{6}$. ' +
									'Pembilang = bagian diarsir, penyebut = total bagian.',
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
									'Siswa dapat mewarnai bagian dari sebuah grid sesuai pecahan yang ditentukan.',
								questionType: 'grid_coloring',
								questionUi: doc(
									heading(
										3,
										'Warnailah $\\frac{1}{6}$ bagian dari kotak di bawah ini!',
									),
									p(
										'Kotak di bawah terdiri dari 12 kotak kecil yang sama besar. ' +
											'Warnailah kotak-kotak sehingga menunjukkan pecahan $\\frac{1}{6}$.',
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
									'Siswa mewarnai 1/6 bagian dari grid 3x4 (12 kotak). ' +
									'1/6 dari 12 = 2 kotak. Siswa harus mewarnai tepat 2 kotak.',
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
										'Arsirlah $\\frac{5}{8}$ bagian dari bidang di bawah ini!',
									),
									p(
										'Bidang di bawah terdiri dari 24 kotak kecil yang sama besar. ' +
											'Arsirlah kotak-kotak sehingga menunjukkan pecahan $\\frac{5}{8}$.',
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
									'Siswa mewarnai 5/8 bagian dari grid 4x6 (24 kotak). ' +
									'5/8 dari 24 = 15 kotak. Siswa harus mewarnai tepat 15 kotak. ' +
									'Kunci: 24 / 8 = 3 kotak per bagian, 5 x 3 = 15 kotak.',
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
